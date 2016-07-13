import {Injectable} from '@angular/core';
import {UIRouter, UIRouterConfig} from 'ui-router-ng2';

import {NkShellStates} from './modules/nk-shell/app.state.ts';
// import {NkCommonStates} from './../modules/nk-common/app.state';

@Injectable()
export class NkUIRouterConfig implements UIRouterConfig {
  configure(uiRouter: UIRouter) {
    NkShellStates
      // .concat(NkCommonStates)
      .forEach(state => {
        uiRouter.stateRegistry.register(state);
      });
    console.log('abc');
    let modules = ['nk-common'];
    require.ensure([], function (require) {
      let mod;
      modules.forEach(item => {
        mod = require(`./modules/${item}/app.state`);
        mod.APP_STATES.forEach(state => {
          uiRouter.stateRegistry.register(state);
        });
      });
    });

    uiRouter.stateProvider.invalidCallbacks = [()=>{
      uiRouter.stateService.go('nkShell.about');
      return false;
    }];

    uiRouter.stateService.defaultErrorHandler((fromPath)=>{
      debugger;
    });

    uiRouter.transitionService.onBefore({}, (evt) => {
      console.log('onBefore', evt);
      return new Promise<boolean>((resolve, reject) => {
        console.log(uiRouter.stateService);
        resolve(true);
      });
    });
    uiRouter.transitionService.onStart({}, (a) => {
      console.log('onStart', a);
    });
    uiRouter.transitionService.onExit({}, (a) => {
      console.log('onExit', a);
    });
    uiRouter.transitionService.onRetain({}, (a) => {
      console.log('onRetain', a);
    });

    uiRouter.transitionService.onEnter({}, (a) => {
      console.log('onEnter', a);
    });

    uiRouter.transitionService.onFinish({}, (a) => {
      console.log('onFinish', a);
    });
    uiRouter.transitionService.onSuccess({}, (a) => {
      console.log('onSuccess', a);
    });
    uiRouter.transitionService.onError({}, (a) => {
      console.log('onError', a);
    });

    uiRouter.urlRouterProvider.otherwise(() => {
      console.log('otherwise');
      //todo，此处默认传递给angular1
      // return uiRouter.stateService.go('nkShell.home', null, null) && null;
      return null;
    });
  }
}