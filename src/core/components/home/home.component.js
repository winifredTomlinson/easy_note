((ng, app) => {
  'use strict';

  class HomeComponent {
    constructor() {
      console.log('home init');
    }
  }

  HomeComponent.annotations = [
    new ng.core.Component({
      template: `
<h1>Home</h1>
      `
    })
  ];

  app.HomeComponent = HomeComponent;
  window.NewkitApp = app;

})(window.ng, window.NewkitApp || {});