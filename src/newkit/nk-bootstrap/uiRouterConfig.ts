import {Injectable, Inject} from '@angular/core';
import {UIRouter, UIRouterConfig} from 'ui-router-ng2';

import {NegModuleLoader} from './../nk-core';
import {NkShellStates} from './../nk-shell/app.state.ts';

@Injectable()
export class NkUIRouterConfig implements UIRouterConfig {
  constructor( @Inject(NegModuleLoader) private negModuleLoader: NegModuleLoader) {
  }

  private _getModuleName(stateName): string {
    if (!stateName) {
      return '';
    }
    let stateNameArr = stateName.split('.');
    let moduleName = stateNameArr.length > 1 ? stateNameArr[0] : '';
    return moduleName.replace(/[A-Z]/, (match) => `-${match.toLowerCase()}`);
  }

  configure(uiRouter: UIRouter) {
    this.negModuleLoader.setRouter(uiRouter);
    NkShellStates
      .forEach(state => {
        uiRouter.stateRegistry.register(state);
      });

    uiRouter.stateProvider.invalidCallbacks = [($from$, $to$) => {
      return new Promise((resolve, reject) => {
        let toStateName = $to$.name();
        let moduleName = this._getModuleName(toStateName);
        if (!moduleName) {
          return;
        }
        this.negModuleLoader.load(moduleName).then(_ => {
          let state = uiRouter.stateService.target(toStateName);
          resolve(state);
        });
      });
    }];

    uiRouter.stateProvider.onInvalid(() => {
      // console.log(this);
      //console.log(from, to);
    });

    uiRouter.stateService.defaultErrorHandler((fromPath) => {
      debugger;
    });

    uiRouter.transitionService.onBefore({}, t => {
      // return false;
      // // debugger
      // console.log('onBefore', t);
      let toState = t.$to().name;
      if (!t.router.stateService.get(toState)) {
        return new Promise<boolean>((resolve, reject) => {
          this.negModuleLoader.load('nk-common').then(_ => {
            uiRouter.stateService.go('nkCommon.comp1');
          });
          resolve(true);
        });
      }
      return Promise.resolve(true);

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