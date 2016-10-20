import { Component, OnInit, AfterContentInit, AfterViewInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Router } from '@angular/router';

import { NegEventBus, NegGlobalLoading, NegStorage, NegAuth, NegAjax, NegUtil, NegProgress } from './../nk-core';
import { MenuComponent } from './components';
import { MessageProcessor, AuthService, MenuService } from './services';

@Component({
  selector: 'nk-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.css']
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
    private router: Router,
    public negEventBus: NegEventBus,
    public negGlobalLoading: NegGlobalLoading,
    public negProgress: NegProgress,
    private negStorage: NegStorage,
    public negAuth: NegAuth,
    private negAjax: NegAjax,
    private negUtil: NegUtil,
    private messageProcessor: MessageProcessor,
    private authService: AuthService,
    private menuService: MenuService
  ) {
    this.rootPath = `${window.location.protocol}//${window.location.host}`;
  }

  ngOnInit() {
    this._doLogin()
      .then(() => {
        this.isLogged = true;
        this._init();
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
    console.log(menu);
    this.currentIsNg1Module = (menu.isNg1 === true);
    if (this.currentIsNg1Module) {
      this.router.navigate(['/system/newkit1']);
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

    this.menuData = this.menuService.getMenuData();
  }
}