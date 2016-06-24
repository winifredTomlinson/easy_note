import {Injectable} from '@angular/core';
import {UIRouter, UIRouterConfig} from 'ui-router-ng2';

import {NkShellStates} from './app.state.ts';
// import {NkCommonStates} from './../modules/nk-common/app.state';

@Injectable()
export class NkUIRouterConfig implements UIRouterConfig {
  configure(uiRouter: UIRouter) {
    NkShellStates
      // .concat(NkCommonStates)
      .forEach(state => {
        uiRouter.stateRegistry.register(state);
      });
    require.ensure([], function(require){
      let mod = require('./../modules/nk-common/app.state');
      mod.APP_STATES.forEach(state => {
        uiRouter.stateRegistry.register(state);
      });
    }); 
    console.log('abc');
    uiRouter.transitionService.onBefore({}, () => {
      console.log('onBefore');
    });
    uiRouter.transitionService.onError({}, () => {
      console.log('onError');
    });
    uiRouter.transitionService.onEnter({}, () => {
      console.log('onEnter');
    });
    uiRouter.transitionService.onExit({}, () => {
      console.log('onExit');
    });
    uiRouter.transitionService.onFinish({}, () => {
      console.log('onFinish');
    });
    uiRouter.transitionService.onRetain({}, () => {
      console.log('onRetain');
    });
    uiRouter.transitionService.onStart({}, () => {
      console.log('onStart');
    });
    uiRouter.transitionService.onSuccess({}, () => {
      console.log('onSuccess');
    });

    uiRouter.urlRouterProvider.otherwise(() => {
      console.log('otherwise');
      uiRouter.stateService.go('nkShell.home', null, null);
    });
  }
}