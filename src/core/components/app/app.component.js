((ng, app) => {
  'use strict';

  let ROUTER_DIRECTIVES = ng.router.ROUTER_DIRECTIVES;
  let ROUTER_PROVIDERS = ng.router.ROUTER_PROVIDERS;
  let MenuComponent = app.MenuComponent;

  class AppComponent {
    constructor(dynamicComponentLoader, viewContainerRef, injector) {
      this.dynamicComponentLoader = dynamicComponentLoader;
      this.viewContainerRef = viewContainerRef;
      this.injector = injector;
      console.log('app init');
      console.log(this.viewContainerRef);
    }

    loadComponent(component) {
      this.viewContainerRef.clear();
      this.dynamicComponentLoader.loadAsRoot(component, '#component-container', this.injector)
        .then((componentRef) => {
          componentRef.changeDetectorRef.detectChanges();
          componentRef.onDestroy(() => {
            componentRef.changeDetectorRef.detach();
          });
          return componentRef;
        });
      // this.dynamicComponentLoader.loadAsRoot(component, this.viewContainerRef, this.injector);
    }

    test() {
      class TestComponent {
        constructor() {
          this.abc = 'Ya!';
          console.log('test init');
        }
        gg(v) {
          alert('dynamic' + v);
        }
      }
      TestComponent.annotations = [
        new ng.core.Component({
          selector: 'test',
          template: `
<h1 (click)="gg(abc)">TestBB</h1> <span>A{{abc}}B</span>
      `
        })
      ];

      this.loadComponent(TestComponent);
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

  AppComponent.parameters = [
    ng.core.DynamicComponentLoader,
    ng.core.ViewContainerRef,
    ng.core.Injector
  ];

  app.AppComponent = AppComponent;
  window.NewkitApp = app;
})(window.ng, window.NewkitApp || {});