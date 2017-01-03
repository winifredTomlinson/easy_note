import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';

import { NegAuth, NegAjax, NegStorage, NegUtil, NegEventBus } from 'newkit/core';

@Injectable()
export class AuthService {

  private isFirstRoute: boolean = true;

  constructor(
    private negAuth: NegAuth,
    private negAjax: NegAjax,
    private negStorage: NegStorage,
    private negUtil: NegUtil,
    private negEventBus: NegEventBus
  ) { }


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

  login(ssoToken: string): Promise<void> {
    let postData = {
      SSOToken: ssoToken,
      ApplicationIds: NewkitConf.Applications.map(x => x.id)
    };
    return this.negAjax.post(`${NewkitConf.NewkitAPI}/login`, postData)
      .then(res => {
        this._processLoginData(res);
        return Promise.resolve();
      }).catch(reason => true);
  }


  autoLogin(): Promise<void> {
    let ssoToken = this.negUtil.getQuery('t');
    if (ssoToken) {
      return this.negAjax.post(`${NewkitConf.NewkitAPI}/autologin`, null, { headers: { 'x-newkit-token': ssoToken } })
        .then(res => {
          this._processLoginData(res);
          return Promise.resolve();
        }).catch(reason => true);
    } else {
      // 刷新
      let authorizeRes = this.negStorage.local.get('x-newkit-authorize');
      let newkitToken = this.negStorage.local.get('x-newkit-token');
      if (authorizeRes && newkitToken) {
        this.negAuth.setAuthData(authorizeRes);
        return Promise.resolve();
      }
      return Promise.resolve();
    }
  }

  requireAuth(to: RouterStateSnapshot, from: ActivatedRouteSnapshot, router: Router, isChild: boolean): Promise<boolean> {
    if (isChild) {
      return Promise.resolve(true);
    }
    let url: string = from.url.join('');
    let toUrl: string = to.url;
    let p: Promise<any> = Promise.resolve(true);
    let useLogin = false;
    if (this.isFirstRoute) {
      this.isFirstRoute = false;
      useLogin = true;
      let ssoToken = this.negUtil.getQuery('t');
      // 通过ssoToken判断是登录还是自动登录
      p = ssoToken ? this.login(ssoToken) : this.autoLogin();
    }
    return p.then(() => {
      if (this.negAuth.isAuthenticated()) {
        if (useLogin) {
          this.negEventBus.emit('global.loginSucceed');
        }
        return Promise.resolve(true);
      } else {
        let ssoLoginUrl = `${NewkitConf.SSOAddress}/login?redirect_url=${window.location.href}`;
        window.location.href = ssoLoginUrl;
        return Promise.resolve(false);
      }
    });
  }

  _processLoginData(res) {
    let token = res.headers.get('x-newkit-token');
    this.negStorage.local.set('x-newkit-token', token, 1);
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
    this.negStorage.local.set('x-newkit-authorize', authData);
    this.negAuth.setAuthData(authData);
  }

}
