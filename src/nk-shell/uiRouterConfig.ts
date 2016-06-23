import {Injectable} from '@angular/core';
import {UIRouter, UIRouterConfig} from 'ui-router-ng2';

import {NkShellStates} from './app.state.ts';
import {NkCommonStates} from './../modules/nk-common/app.state';

@Injectable()
export class NkUIRouterConfig implements UIRouterConfig {
  configure(uiRouter: UIRouter) {
    NkShellStates
      .concat(NkCommonStates)
      .forEach(state => {
        uiRouter.stateRegistry.register(state);
      });

    uiRouter.urlRouterProvider.otherwise(() => {
      console.log('otherwise');
      uiRouter.stateService.go('nkShell.home', null, null);
    }); 
  }
}