import { Injectable, Inject } from '@angular/core';
import { Http } from '@angular/http';

import { UIRouter } from 'ui-router-ng2';

const loadedModules: Set<string> = new Set<string>();

@Injectable()
export class NegModuleLoader {

  private uiRouter: UIRouter;

  constructor(private http: Http) { }

  setRouter(uiRouter) {
    this.uiRouter = uiRouter;
  }

  load(moduleName): Promise<any> {
    if (loadedModules.has(moduleName)) {
      return Promise.resolve();
    }
    return new Promise((resolve, reject) => {
      let path = NewkitConf.debug ? '' : '/assets/js';
      this.http.get(`${path}/${moduleName}.js`)
        .toPromise()
        .then(res => {
          let mod = eval(res.text());
          mod.MODULE_STATES.forEach(state => {
            this.uiRouter.stateRegistry.register(state);
          });
          loadedModules.add(moduleName);
          resolve();
        }).catch(err => reject(err));
    });
  }
}