import { Injectable } from '@angular/core';

import { NegAuth, NegAjax, NegStorage } from './../../nk-core';

@Injectable()
export class AuthService {

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
      });
  }

  autoLogin(token: string): Promise<any> {
    // Step1: if authorize exists.
    let authorizeRes = this.negStorage.local.get('x-newkit-authorize');
    if (authorizeRes) {
      this.negAuth.setAuthData(authorizeRes);
      return Promise.resolve();
    }

    // Step2: execute auto login
    return this.negAjax.post(`${NewkitConf.NewkitAPI}/autologin`, null, { headers: { 'x-newkit-token': token } })
      .then(res => {
        this._processLoginData(res);
        return Promise.resolve();
      });
  }

  _processLoginData(res) {
    let token = res.headers.get('x-newkit-token');
    this.negStorage.local.set('x-newkit-token', token, 1)
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