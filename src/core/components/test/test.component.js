((ng, app) => {
  'use strict';

  class TestComponent {
    constructor() {
      console.log('home init');
      this.aaaa = 'abc';
    }
  }

  TestComponent.annotations = [
    new ng.core.Component({
      selector: 'about',
      template: `
<h1>Test</h1>
{{aaaa}}
      `
    })
  ];

  app.TestComponent = TestComponent;
  window.NewkitApp = app;

})(window.ng, window.NewkitApp || {});