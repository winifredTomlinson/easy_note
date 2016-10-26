import { Component, OnInit, AfterContentInit, AfterViewInit, OnDestroy } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';

import { NegEventBus, NegGlobalLoading, NegStorage, NegAuth, NegAjax, NegUtil, NegProgress, NegAlert } from 'newkit/core';
import { MenuComponent } from './components';
import { MessageProcessor, AuthService, MenuService } from './services';

@Component({
  selector: 'nk-app',
  template: require('./app.component.html'),
  styles: [require('./app.css')]
})
export class AppComponent implements OnInit, AfterContentInit {

  private menuData: Array<any>;

  public currentIsNg1Module: boolean = false;
  public ng1PageSrc: SafeResourceUrl;
  public iframeHeight: string;

  private isLogged: boolean = false;

  private breadcrumbs: string[] = [];

  private subs = [];

  constructor(
    private sanitizer: DomSanitizer,
    private router: Router,
    public negEventBus: NegEventBus,
    public negGlobalLoading: NegGlobalLoading,
    public negProgress: NegProgress,
    private negStorage: NegStorage,
    public negAuth: NegAuth,
    private negAjax: NegAjax,
    private negUtil: NegUtil,
    private negAlert: NegAlert,
    private messageProcessor: MessageProcessor,
    private authService: AuthService,
    private menuService: MenuService
  ) {
  }

  ngOnInit() {
    this._initFeedback();
    this._doLogin()
      .then(() => {
        this.isLogged = true;
        this._init();
        this.negStorage.local.set('login-error-count', 0);
        setTimeout(() => {
          this.negEventBus.emit('global.setCurrentMenu', window.location.pathname);
        }, 500);
      }).catch(reason => {
        let errorCount = (this.negStorage.local.get('login-error-count') || 0) + 1;
        if (errorCount > 10) {
          return console.log('login failed:', reason);
        }
        let ssoLoginUrl = `${NewkitConf.SSOAddress}/login?redirect_url=${window.location.href}`;
        window.location.href = ssoLoginUrl;
      });

  }

  ngAfterContentInit() {
    let sub1 = this.negEventBus.on('global.setBreadcrumbs', data => {
      this.breadcrumbs = data;
    });
    let sub2 = this.negEventBus.on('global.setLastBreadcrumb', data => {
      this.breadcrumbs[this.breadcrumbs.length - 1] = data;
    });
    this.subs.push(sub1, sub2);
  }

  ngOnDestroy() {
    this.subs.forEach(s => s.unsubscribe());
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

  _doLogin(): Promise<any> {
    let p: Promise<any>; // Auth Promise
    // If redirect by sso
    let query = this.negUtil.getQuery();
    let ssoToken = query['t'];
    if (ssoToken) {
      let search = [];
      Object.keys(query).forEach(key => {
        if (key !== 't') {
          search.push(`${key}=${query[key]}`);
        }
      });
      location.search = `?${search.join('&')}`;
      p = this.authService.login(ssoToken);
    } else {
      let token = this.negStorage.local.get('x-newkit-token');
      // No token
      if (!token) {
        let ssoLoginUrl = `${NewkitConf.SSOAddress}/login?redirect_url=${window.location.href}`;
        window.location.href = ssoLoginUrl;
        return;
      }
      // Auto login
      p = this.authService.autoLogin(token);
    }
    // Process result
    return p;
  }

  _processMenuChanged(menu) {
    this.currentIsNg1Module = (menu.isNg1 === true);
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
    this.ng1PageSrc = this.sanitizer.bypassSecurityTrustResourceUrl('');
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