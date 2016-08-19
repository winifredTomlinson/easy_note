import { Injectable } from '@angular/core';

@Injectable()
export class NegContext {

  public userProfile: any;

  constructor() { }

  setUserProfile(profile) {
    this.userProfile = profile;
  }

}