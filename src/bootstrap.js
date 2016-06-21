((ng, app) => {
  'use strict';
  let provide = ng.core.provide;
  let bootstrap = ng.platformBrowserDynamic.bootstrap;
  let LocationStrategy = ng.common.LocationStrategy;
  let HashLocationStrategy = ng.common.HashLocationStrategy;
  let PlatformLocation = ng.common.PlatformLocation;
  let BrowserPlatformLocation = ng.platformBrowser.BrowserPlatformLocation;
  let uiRouter = window['ui-router-ng2'];

  class NewkitUIRouterConfig {
    constructor() {
    }
    configure(uiRouter) {

      this.uiRouter = uiRouter;

      uiRouter.stateRegistry.register({
        name: 'app', component: NewkitApp.TestComponent, url: '/test/h'
      });

      uiRouter.urlRouterProvider.otherwise(() => uiRouter.stateService.go('app', null, null));

      let rootState = uiRouter.stateRegistry.root();
      rootState.resolve['http'] = () => ng.core.Inject(ng.http);
    }

    registerRoute(state){
      this.uiRouter.stateRegistry.register(state);
    }

  }
  // NewkitUIRouterConfig.parameters = ['Injector'];

  let deps = [];
  // deps.push(ng.core.Injector);
  deps.push(provide(LocationStrategy, { useClass: HashLocationStrategy }));
  deps.push(provide(PlatformLocation, { useClass: BrowserPlatformLocation }));
  for (let up of uiRouter.UIROUTER_PROVIDERS) {
    deps.push(up);
  }
  deps.push(provide(uiRouter.UIRouterConfig, { useClass: NewkitUIRouterConfig }));
  deps.push(provide(ng.core.PLATFORM_DIRECTIVES, { useValue: [uiRouter.UIROUTER_DIRECTIVES], multi: true }));

  bootstrap(app.AppComponent, deps);

})(window.ng, window.NewkitApp);

jQuery(function () {
  jQuery('html').niceScroll({
    autohidemode: false,
    cursorcolor: '#2dc3e8'
  });
});