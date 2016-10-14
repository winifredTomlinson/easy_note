import { Component, OnInit, AfterContentInit, AfterViewInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

import { NegEventBus, NegGlobalLoading, NegStorage, NegAuth, NegAjax, NegUtil, NegProgress } from './../nk-core';
import { MenuComponent } from './components';
import { MessageProcessor, AuthService } from './services';

@Component({
  selector: 'nk-app',
  templateUrl: './app.component.html',
  styles: [
    // require('!raw!./app.component.styl') 
  ],
  providers: [MessageProcessor, AuthService]
})
export class AppComponent implements OnInit, AfterContentInit {

  private menuData: Array<any>;

  public currentIsNg1Module: boolean = false;
  public ng1PageSrc: SafeResourceUrl;
  public iframeHeight: string;

  private isLogged: boolean = false;
  private rootPath: string;

  constructor(
    private sanitizer: DomSanitizer,
    public negEventBus: NegEventBus,
    public negGlobalLoading: NegGlobalLoading,
    public negProgress: NegProgress,
    private negStorage: NegStorage,
    public negAuth: NegAuth,
    private negAjax: NegAjax,
    private negUtil: NegUtil,
    private messageProcessor: MessageProcessor,
    private authService: AuthService
  ) {
    this.rootPath = `${window.location.protocol}//${window.location.host}`;
  }

  ngOnInit() {
    this._doLogin()
      .then(() => {
        this.isLogged = true;
        this._init();
        setTimeout(() => {
          this._initMenuDataEvents();
        }, 100);
        this.negStorage.local.set('login-error-count', 0);
      }).catch(reason => {
        let errorCount = (this.negStorage.local.get('login-error-count') || 0) + 1;
        if (errorCount > 10) {
          return console.log('login failed:', reason);
        }
        let ssoLoginUrl = `${NewkitConf.SSOAddress}/login?redirect_url=${this.rootPath}/`;
        window.location.href = ssoLoginUrl;
      });
  }

  ngAfterContentInit() {

  }

  _initMenuDataEvents() {
    $(function () {
      $('.nk-menu li').on('click', function (e) {
        var $this = $(this);
        $this[$this.hasClass('open') ? 'removeClass' : 'addClass']('open');
        if ($this.find('ul').length === 0) {
          $('.nk-menu li').removeClass('active');
          $this.addClass('active').parents('li').addClass('active');
        }
        return false;
      });
    });
  }

  _doLogin(): Promise<any> {
    let p: Promise<any>; // Auth Promise
    // If redirect by sso
    let ssoToken = this.negUtil.getQuery('t');
    if (ssoToken) {
      p = this.authService.login(ssoToken);
    } else {
      let token = this.negStorage.local.get('x-newkit-token');
      // No token
      if (!token) {
        let ssoLoginUrl = `${NewkitConf.SSOAddress}/login?redirect_url=${this.rootPath}/`;
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
    this.currentIsNg1Module = menu.isNg1;
    if (this.currentIsNg1Module) {
      this.messageProcessor.sendMessageEvent('pageFaq');
      let timerId: any = setTimeout(() => {
        let url = `http://10.16.85.170:8888${menu.url}?theme=core`;
        this.ng1PageSrc = this.sanitizer.bypassSecurityTrustResourceUrl(url);
        this.negGlobalLoading.show();
      }, 100);
      let sub = this.negEventBus.on('postMessage.pageOk', data => {
        console.log('canceled');
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
    
    this._initMenuData();
  }
  _initMenuData() {
    this.menuData = [{
      icon: 'fa fa-cogs',
      name: 'Control Panel',
      // url: '/home',
      children: [{
        icon: 'fa fa-wrench',
        name: 'Maintain',
        // url: '/',
        children: [{
          icon: 'fa fa-file',
          name: 'Menu Setting',
          // url: 'nkShell.menuSetting',
          url: '/system/menu-setting',
          active: true,
          isNg1: true
        }, {
          icon: 'fa fa-search',
          name: 'Global Search',
          url: '/system/global-search',
          // url: 'nkShell.globalSearch',
          isNg1: true,
        }, {
          icon: 'fa fa-rss',
          name: 'Deploy Module',
          // url: 'nkShell.deploy',
          url: '/system/deploy',
          isNg1: true
        }]
      }, {
        icon: 'fa fa-home',
        name: 'Home(Test)',
        url: 'nkShell.home'
      }]
    }, {
      icon: 'fa fa-link',
      name: 'Global Configuration',
      url: 'nkShell.globalConfiguration',
      children: []
    }, {
      icon: 'fa fa-plus',
      name: 'Comp1',
      url: 'nkCommon.comp1'
    }, {
      icon: 'fa fa-plus',
      name: 'Not Found',
      url: 'nkCommon.test'
    }];
  }
}