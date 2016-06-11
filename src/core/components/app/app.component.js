((ng, app) => {
  'use strict';

  let ROUTER_DIRECTIVES = ng.router.ROUTER_DIRECTIVES;
  let ROUTER_PROVIDERS = ng.router.ROUTER_PROVIDERS;
  let MenuComponent = app.MenuComponent;

  class AppComponent {
    constructor() {
      console.log('app init');
    }
  }

  AppComponent.annotations = [
    new ng.core.Component({
      selector: 'nk-app',
      templateUrl: '/src/core/components/app/app.html',
      directives: [ROUTER_DIRECTIVES, MenuComponent],
      providers: [ROUTER_PROVIDERS]
    }),
    new ng.router.Routes([{
      path: '/home',
      component: app.HomeComponent
    }, {
      path: '/about',
      component: app.AboutComponent
    }])
  ];

  app.AppComponent = AppComponent;
  window.NewkitApp = app;
})(window.ng, window.NewkitApp || {});