import { Injectable } from '@angular/core';

import { NegStorage } from './negStorage';

@Injectable()
export class NegAuth {
  private authData: any;
  constructor(private negStorage: NegStorage) { }

  setAuthData(authData) {
    this.authData = authData;
    this.authData.newkitToken = this.negStorage.local.get('x-newkit-token');
  }

  getAuthData(){
    return this.authData;
  }
}