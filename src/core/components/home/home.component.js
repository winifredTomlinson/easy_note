((ng, app) => {
  'use strict';

  class HomeComponent {
    constructor() {
      console.log('home init');
    }
  }

  HomeComponent.annotations = [
    new ng.core.Component({
      selector: 'home',
      templateUrl: '/src/core/components/home/home.html',
      directives: [app.AboutComponent]
    })
  ];

  app.HomeComponent = HomeComponent;
  window.NewkitApp = app;

})(window.ng, window.NewkitApp || {});