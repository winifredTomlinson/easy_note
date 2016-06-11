((ng, app) => {
  'use strict';

  class AboutComponent {
    constructor() {
      console.log('home init');
    }
  }

  AboutComponent.annotations = [
    new ng.core.Component({
      selector: 'about',
      template: `
<h1>About</h1>
      `
    })
  ];

  app.AboutComponent = AboutComponent;
  window.NewkitApp = app;

})(window.ng, window.NewkitApp || {});