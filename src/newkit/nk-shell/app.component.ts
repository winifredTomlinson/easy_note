import { Component, OnInit, AfterContentInit, AfterViewInit, OnDestroy } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { TranslateService } from 'ng2-translate';

import { NegEventBus, NegGlobalLoading, NegStorage, NegAuth, NegAjax, NegAlert, NegContext, NegProgress } from 'newkit/core';
import { MenuComponent } from './components';
import { MessageProcessor, MenuService } from './services';

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
          self.negAlert.msg('Send feedback successfully.');
        } else {
          self.negAlert.error('Send feedback failed.');
        }
      }
    });
  }

  _processMenuChanged(menu) {
    this.currentIsNg1Module = (menu.isNg1 !== false);
    if (this.currentIsNg1Module) {
      this.router.navigate(['/system/newkit1']);
      this.messageProcessor.sendMessageEvent('pageFaq');
      this.negEventBus.emit('global.setCurrentMenu', menu.Url);
      setTimeout(() => {
        window.location.hash = menu.Url;
      }, 100);
      let timerId: any = setTimeout(() => {
        let url = `http://10.16.85.170:8888${menu.Url}?theme=core`;
        this.ng1PageSrc = this.sanitizer.bypassSecurityTrustResourceUrl(url);
        this.negGlobalLoading.show();
      }, 100);
      let sub = this.negEventBus.on('postMessage.pageOk', data => {
        window.clearTimeout(timerId);
        this.messageProcessor.sendMessageEvent('redirect', menu.Url);
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