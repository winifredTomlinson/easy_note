import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

import { NegAuth, NegAjax, NegStorage } from 'newkit/core';

@Injectable()
export class AuthService {

  private isFirstRoute: boolean = true;

  constructor(
    private negAuth: NegAuth,
    private negAjax: NegAjax,
    private negStorage: NegStorage
  ) { }

  login(ssoToken: string): Promise<any> {
    let postData = {
      SSOToken: ssoToken,
      ApplicationIds: NewkitConf.Applications
    };
    return this.negAjax.post(`${NewkitConf.NewkitAPI}/login`, postData)
      .then(res => {
        this._processLoginData(res);
        return Promise.resolve();
      }).catch(reason => Promise.reject(reason));
  }

  getSystemConfigData() {
    return Promise.all([
      this.negAjax.get(`${NewkitConf.APIGatewayAddress}/framework/v1/user-profile/Newkit/${this.negAuth.getUserInfo().UserID}`),
      this.negAjax.get(`${NewkitConf.NewkitAPI}/menu/urls`)
    ])
      .then(datas => {
        this.negAuth.setAuthorizedUrls(datas[1].json());
        this.negAuth.setUserConfig(datas[0].json());
        return datas;
      });
  }

  autoLogin(): Promise<any> {
    let token = '';
    // Step1: if authorize exists.
    let authorizeRes = this.negStorage.session.get('x-newkit-authorize');
    let newkitToken = this.negStorage.local.get('x-newkit-token');
    if (authorizeRes && token) {
      this.negAuth.setAuthData(authorizeRes);
      this.negAjax.setToken(newkitToken);
      return Promise.resolve();
    }

    // Step2: execute auto login
    return this.negAjax.post(`${NewkitConf.NewkitAPI}/autologin`, null, { headers: { 'x-newkit-token': token } })
      .then(res => {
        this._processLoginData(res);
        return Promise.resolve();
      });
  }

  
  // _doLogin(): Promise<boolean> {
  //   let p: Promise<any>; // Auth Promise
  //   // If redirect by sso
  //   let ssoToken = this.negUtil.getQuery('t');
  //   if (ssoToken) {
  //     p = this.authService.login(ssoToken);
  //   } else {
  //     let token = this.negStorage.local.get('x-newkit-token');
  //     // No token
  //     if (!token) {
  //       p = Promise.reject('No token.');
  //     }
  //     // Auto login
  //     p = this.authService.autoLogin(token);
  //   }

  //   return new Promise((resolve, reject) => {
  //     p.then(() => {
  //       return this.authService.getSystemConfigData()
  //         .then(() => {
  //           this.negEventBus.emit('global.loginSucceed');
  //           resolve(true);
  //         }).catch(reason => {
  //           return Promise.reject('Get system config error.');
  //         });
  //     })
  //       .catch(reason => {
  //         let errorCount = (this.negStorage.local.get('login-error-count') || 0) + 1;
  //         if (errorCount > 3) {
  //           return console.log('login failed:', reason);
  //         }
  //         resolve(false);
  //         let ssoLoginUrl = `${NewkitConf.SSOAddress}/login?redirect_url=${window.location.href}`;
  //         window.location.href = ssoLoginUrl;
  //       });
  //   });


  //   //     this.negA
  //   // x-newkit-token:8d34b453abfaf5726aa48fa726301c39
  // }

  requireAuth(to: RouterStateSnapshot, from: ActivatedRouteSnapshot, router: Router): Promise<boolean>{
    let url: string = from.url.join('');
    let toUrl: string = to.url;
    console.log('from', url, 'to', toUrl);
    let p: Promise<any>;
    if(this.isFirstRoute){
      p = this.autoLogin();
    }
    return Promise.resolve(true);
    // if (this.isFirstRoute) {
    //   this.isFirstRoute = false;
    //   // return this._doLogin();
    // }
    // console.log('AuthGuard#canActivate called');
    // if (this.negAuth.isAuthenticated()) {
    //   return Promise.resolve(true);
    // } else {
    //   return Promise.resolve(false);
    // }
  }

  _processLoginData(res) {
    let token = res.headers.get('x-newkit-token');
    this.negStorage.local.set('x-newkit-token', token, 1);
    this.negAjax.setToken(token);
    let data = res.json();
    let authData = {
      userInfo: data.UserInfo,
      roleAttributes: data.RoleAttributes,
      roles: data.Roles,
      functions: data.Functions,
      menus: data.MenuData,
      globalSearch: data.globalSearch,
      neweggPermission: data.NeweggPermission
    };
    this.negStorage.session.set('x-newkit-authorize', authData);
    this.negAuth.setAuthData(authData);
  }
  
}