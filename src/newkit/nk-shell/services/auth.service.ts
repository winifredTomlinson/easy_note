import { Injectable } from '@angular/core';

import { NegAuth, NegAjax, NegStorage } from 'newkit/core';

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

  autoLogin(token: string): Promise<any> {
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