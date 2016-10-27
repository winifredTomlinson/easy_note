import { Injectable } from '@angular/core';

import { NegStorage } from './negStorage';

@Injectable()
export class NegAuth {

  private authData: any;

  private authorizedUrls: any = {};

  private userConfig: any = {};

  private _isAuthenticated: boolean = false;
  constructor(private negStorage: NegStorage) { }

  setAuthData(authData) {
    this.authData = authData;
    this.authData.newkitToken = this.negStorage.local.get('x-newkit-token');
    this._isAuthenticated = true;
  }

  setAuthorizedUrls(value) {
    this.authorizedUrls = value;
  }

  setUserConfig(value) {
    this.userConfig = value;
  }

  getAuthData() {
    return this.authData;
  }

  getUserInfo() {
    return this.authData ? this.authData.userInfo : null;
  }

  isAuthenticated() {
    return this._isAuthenticated;
  }
}