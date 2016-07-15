import { Injectable, Inject } from '@angular/core';
import {Http} from '@angular/http';

import {UIRouter} from 'ui-router-ng2';

@Injectable()
export class NegModuleLoader {

  private uiRouter: UIRouter;

  constructor(private http: Http) {

  }

  setRouter(uiRouter) {
    this.uiRouter = uiRouter;
  }

  load(moduleName) {
    return new Promise((resolve, reject) => {
      this.http.get('/assets/js/nk-common.js')
        .toPromise()
        .then(res => {
          let mod = eval(res.text());
          mod.APP_STATES.forEach(state => {
            this.uiRouter.stateRegistry.register(state);
          });
          resolve();
        }).catch(err => reject(err));
    });
  }
}