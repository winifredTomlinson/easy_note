((ng, app) => {
  'use strict';

  class AboutComponent {
    constructor() {
      console.log('home init');
      this.aaaa = 'abc';
    }
  }

  AboutComponent.annotations = [
    new ng.core.Component({
      selector: 'about',
      template: `
<h1>About</h1>
{{aaaa}}
      `
    })
  ];

  app.AboutComponent = AboutComponent;
  window.NewkitApp = app;

})(window.ng, window.NewkitApp || {});