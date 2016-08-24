import { Injectable } from '@angular/core';

@Injectable()
export class NegAuth {
  private authData: any;
  constructor() { }

  setAuthData(authData) {
    this.authData = authData;
  }
}