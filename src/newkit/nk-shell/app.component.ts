import { Component, OnInit, AfterContentInit, AfterViewInit, OnDestroy } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { TranslateService } from 'newkit/core';

import { NegEventBus, NegGlobalLoading, NegStorage, NegAuth, NegAjax, NegAlert, NegContext, NegProgress } from 'newkit/core';
import { MenuComponent } from './components';
import { MessageProcessor, MenuService } from './services';

declare let ace: any;

@Component({
  selector: 'nk-app',
  template: require('./app.component.html'),
  styles: [require('./app.css')]
})
export class AppComponent implements OnInit, OnDestroy {

  private menuData: Array<any>;

  public currentIsNg1Module: boolean = false;
  public ng1PageSrc: SafeResourceUrl = this.sanitizer.bypassSecurityTrustResourceUrl('about:blank');
  public iframeHeight: string;

  private isLogged: boolean = false;

  private breadcrumbs: string[] = [];

  private subs = [];

  private userInfo: any = {}; // 用户信息

  private currentLang: string = 'en-us';
  private currentSkin: string = 'no-skin';
  private skins: Array<any> = [
    { key: 'no-skin', bgColor: '#438EB9' },
    { key: 'skin-1', bgColor: '#222A2D' },
    { key: 'skin-2', bgColor: '#C6487E' },
    { key: 'skin-3', bgColor: '#D0D0D0' }
  ];

  constructor(
    private sanitizer: DomSanitizer,
    private router: Router,
    private translateService: TranslateService,
    public negEventBus: NegEventBus,
    public negGlobalLoading: NegGlobalLoading,
    public negStorage: NegStorage,
    public negAuth: NegAuth,
    public negAjax: NegAjax,
    public negAlert: NegAlert,
    public negContext: NegContext,
    public negProgress: NegProgress,
    public messageProcessor: MessageProcessor,
    public menuService: MenuService
  ) {
    translateService.setDefaultLang('en-us');
    translateService.setTranslation('en-us', {
      'test': {
        t1: 'TEST'
      }
    });
    translateService.setTranslation('zh-cn', {
      'test': {
        t1: '测试'
      }
    });
    translateService.setTranslation('zh-tw', {
      'test': {
        t1: '測試'
      }
    });
  }

  changeSkin(skin) {
    this.currentSkin = skin;
    this.applyChanges(skin);
  }

  applyChanges(skin_class) {
    //skin cookie tip
    var body = $(document.body);
    body.removeClass('no-skin skin-1 skin-2 skin-3');
    //if(skin_class != 'skin-0') {
    body.addClass(skin_class);
    ace.data.set('skin', skin_class);
    //save the selected skin to cookies
    //which can later be used by your server side app to set the skin
    //for example: <body class="<?php echo $_COOKIE['ace_skin']; ?>"
    //} else ace.data.remove('skin');

    var skin3_colors = ['red', 'blue', 'green', ''];


    //undo skin-1
    $('.ace-nav > li.grey').removeClass('dark');

    //undo skin-2
    $('.ace-nav > li').removeClass('no-border margin-1');
    $('.ace-nav > li:not(:last-child)').removeClass('light-pink').find('> a > ' + ace.vars['.icon']).removeClass('pink').end().eq(0).find('.badge').removeClass('badge-warning');
    $('.sidebar-shortcuts .btn')
      .removeClass('btn-pink btn-white')
      .find(ace.vars['.icon']).removeClass('white');

    //undo skin-3
    $('.ace-nav > li.grey').removeClass('red').find('.badge').removeClass('badge-yellow');
    $('.sidebar-shortcuts .btn').removeClass('btn-primary btn-white')
    var i = 0;
    $('.sidebar-shortcuts .btn').each(function () {
      $(this).find(ace.vars['.icon']).removeClass(skin3_colors[i++]);
    })

    var skin0_buttons = ['btn-success', 'btn-info', 'btn-warning', 'btn-danger'];
    if (skin_class == 'no-skin') {
      var i = 0;
      $('.sidebar-shortcuts .btn').each(function () {
        $(this).attr('class', 'btn ' + skin0_buttons[i++ % 4]);
      })

      $('.sidebar[data-sidebar-scroll=true]').ace_sidebar_scroll('updateStyle', '');
      $('.sidebar[data-sidebar-hover=true]').ace_sidebar_hover('updateStyle', 'no-track scroll-thin');
    }

    else if (skin_class == 'skin-1') {
      $('.ace-nav > li.grey').addClass('dark');
      var i = 0;
      $('.sidebar-shortcuts')
        .find('.btn').each(function () {
          $(this).attr('class', 'btn ' + skin0_buttons[i++ % 4]);
        })

      $('.sidebar[data-sidebar-scroll=true]').ace_sidebar_scroll('updateStyle', 'scroll-white no-track');
      $('.sidebar[data-sidebar-hover=true]').ace_sidebar_hover('updateStyle', 'no-track scroll-thin scroll-white');
    }

    else if (skin_class == 'skin-2') {
      $('.ace-nav > li').addClass('no-border margin-1');
      $('.ace-nav > li:not(:last-child)').addClass('light-pink').find('> a > ' + ace.vars['.icon']).addClass('pink').end().eq(0).find('.badge').addClass('badge-warning');

      $('.sidebar-shortcuts .btn').attr('class', 'btn btn-white btn-pink')
        .find(ace.vars['.icon']).addClass('white');

      $('.sidebar[data-sidebar-scroll=true]').ace_sidebar_scroll('updateStyle', 'scroll-white no-track');
      $('.sidebar[data-sidebar-hover=true]').ace_sidebar_hover('updateStyle', 'no-track scroll-thin scroll-white');
    }

    //skin-3
    //change shortcut buttons classes, this should be hard-coded if you want to choose this skin
    else if (skin_class == 'skin-3') {
      body.addClass('no-skin');//because skin-3 has many parts of no-skin as well

      $('.ace-nav > li.grey').addClass('red').find('.badge').addClass('badge-yellow');

      var i = 0;
      $('.sidebar-shortcuts .btn').each(function () {
        $(this).attr('class', 'btn btn-primary btn-white');
        $(this).find(ace.vars['.icon']).addClass(skin3_colors[i++]);
      })

      $('.sidebar[data-sidebar-scroll=true]').ace_sidebar_scroll('updateStyle', 'scroll-dark no-track');
      $('.sidebar[data-sidebar-hover=true]').ace_sidebar_hover('updateStyle', 'no-track scroll-thin');
    }

    //some sizing differences may be there in skins, so reset scrollbar size
    $('.sidebar[data-sidebar-scroll=true]').ace_sidebar_scroll('reset')
    //$('.sidebar[data-sidebar-hover=true]').ace_sidebar_hover('reset')

    if (ace.vars['old_ie']) ace.helper.redraw(document.body, true);

  }

  ngOnInit() {
    let sub1 = this.negEventBus.on('global.setBreadcrumbs', data => {
      this.breadcrumbs = data;
    });
    let sub2 = this.negEventBus.on('global.setLastBreadcrumb', data => {
      this.breadcrumbs[this.breadcrumbs.length - 1] = data;
    });
    this.subs.push(sub1, sub2);
    this._initFeedback();
    this.negEventBus.on('global.loginSucceed', () => {
      this.isLogged = true;
      this._init();
      this.negStorage.local.set('login-error-count', 0);
      let pathname = window.location.pathname;
      this.router.navigateByUrl(pathname + window.location.hash);
      this.userInfo = this.negAuth.getUserInfo();
      setTimeout(() => {
        this.negEventBus.emit('global.setCurrentMenu', pathname);
      }, 500);
    });
  }

  ngOnDestroy() {
    this.subs.forEach(s => s.unsubscribe());
  }

  private changeLanguage(lang) {
    this.negContext.setLang(lang);
    this.currentLang = lang;
  }

  private goAbout() {
    this.router.navigate(['/system/about']);
  }

  private showFeedback() {
    window['negFeedback'].show();
  }

  private doLogout() {
    this.negStorage.local.remove('x-newkit-token');
    let logoutUrl = `http://10.16.75.26:8501/logout?redirect_url=${encodeURIComponent(window.location.href)}`;
    window.location.href = logoutUrl;
  }

  _initFeedback() {
    let self = this;
    window['negFeedback'].init({
      feedbackHeader: '<i>Thanks for your feedback</i>', // 可选参数，配置header，允许html标签
      dfisUploadAddress: 'http://neg-app-dfis:8200/newkit/attachment', //必须，配置文件上传路径，当前仅支持dfis。
      from: 'jay.m.hu@newegg.com', // 发件人地址，必须
      to: 'jay.m.hu@newegg.com', // 收件人地址，必须
      subject: 'Newkit feedback info', //邮件主题，必须
      mailServer: 'http://10.16.75.24:3000/framework/v1/mail', // 邮件服务器地址，必须
      html2canvasOpt: {}, // html2canvas本身的配置项，增加了一个自定义属性 disableImages，要使用该配置，必须引入修改版： https://github.com/HstarStudio/html2canvas
      userInfo: { // 用户信息，必须
        userId: 'jh3r', //用户ID
        userName: 'Jay.M.Hu', //用户名称
        department: 'MIS', // 用户部门，如外网用户，则可以设置为'N/A'
        ipAddress: '127.0.0.1' //用户IP地址，一般是服务端返回
      },
      onBeforeSend: function (mailObj) { // 可选，在邮件发送前，还可以操作mailObj。
        // 如果要自定义邮件题，请使用：
        // mailObj.Body = 'custom mail body'; 
        // 同理，也可修改其他邮件属性
      },
      onAfterSend: function (result) { // 可选，邮件发送之后的回调。
        if (result.IsSendSuccess) {
          self.negAlert.success('Send feedback successfully.');
        } else {
          self.negAlert.error('Send feedback failed.');
        }
      }
    });
  }

  _processMenuChanged(menu) {
    this.currentIsNg1Module = (menu.isNewkit1Page !== false);
    if (this.currentIsNg1Module) {
      this.router.navigate(['/system/newkit1']);
      this.messageProcessor.sendMessageEvent('pageFaq');
      this.negEventBus.emit('global.setCurrentMenu', menu.url);
      setTimeout(() => {
        window.location.hash = menu.url;
      }, 100);
      let timerId: any = setTimeout(() => {
        let url = `http://10.16.85.170:8888${menu.url}?theme=core`;
        this.ng1PageSrc = this.sanitizer.bypassSecurityTrustResourceUrl(url);
        this.negGlobalLoading.show();
      }, 100);
      let sub = this.negEventBus.on('postMessage.pageOk', data => {
        window.clearTimeout(timerId);
        this.messageProcessor.sendMessageEvent('redirect', menu.url);
        sub.unsubscribe();
        return;
      });
    }
  }

  _init() {
    this.messageProcessor.init(this);
    window.addEventListener('message', evt => {
      this.messageProcessor.processMessage(evt);
    }, false);

    this.negEventBus.on('nkShell.menuChanged', data => {
      this._processMenuChanged(data);
    });

    this.menuData = this.menuService.getMenuData();
  }
}