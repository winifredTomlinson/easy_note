import { Injectable } from '@angular/core';

import { NegStorage } from './negStorage';

@Injectable()
export class NegAuth {
  private authData: any;

  private _isAuthenticated: boolean = false;
  constructor(private negStorage: NegStorage) { }

  setAuthData(authData) {
    this.authData = authData;
    this.authData.newkitToken = this.negStorage.local.get('x-newkit-token');
    this._isAuthenticated = true;
  }

  getAuthData() {
    return this.authData;
  }

  isAuthenticated() {
    return this._isAuthenticated;
  }
}