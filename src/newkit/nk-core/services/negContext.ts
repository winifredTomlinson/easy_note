import { Injectable } from '@angular/core';
import { TranslateService } from 'ng2-translate';

@Injectable()
export class NegContext {

  public userProfile: any;

  public theme: string = 'default';

  public lang: string = 'en';

  constructor(private translateService: TranslateService) {

  }

  setUserProfile(profile) {
    this.userProfile = profile;
  }

  setTheme(value) {
    this.theme = value;
  }

  setLang(value) {
    this.lang = value;
    this.translateService.use(value);
  }

}