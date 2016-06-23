import {Component, Injectable, DynamicComponentLoader, ViewContainerRef, Injector, Inject} from '@angular/core';
// import {ROUTER_PROVIDERS, ROUTER_DIRECTIVES, Routes} from '@angular/router';

import {MenuComponent} from './menu.component';

import {HomeComponent} from './../home/home.component';
import {AboutComponent} from './../about/about.component';

@Component({
  selector: 'nk-shell',
  template: require('./app.html'),
  directives: [MenuComponent],
  styles: [require('./app.css')],
})

// @Routes([
//   { path: '/home', component: HomeComponent },
//   { path: '/about', component: AboutComponent }
// ])

@Injectable()
export class AppComponent {
  constructor(
    @Inject(DynamicComponentLoader) private dynamicComponentLoader: DynamicComponentLoader,
    @Inject(ViewContainerRef) private viewContainerRef: ViewContainerRef,
    @Inject(Injector) private injector: Injector
  ) {

  }

  loadComponent(component: any) {
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

  private test(): void {
    class TestComponent {
      constructor() {
        // this.abc = 'Ya!';
        console.log('test init');
      }
      gg(v: any) {
        alert('dynamic' + v);
      }
    }
    //       TestComponent.annotations = [
    //         new ng.core.Component({
    //           selector: 'test',
    //           template: `
    // <h1 (click)="gg(abc)">TestBB</h1> <span>A{{abc}}B</span>
    //       `
    //         })
    //       ];

    this.loadComponent(TestComponent);
  }
}


// ((ng, app) => {
//   'use strict';

//   let ROUTER_DIRECTIVES = ng.router.ROUTER_DIRECTIVES;
//   let ROUTER_PROVIDERS = ng.router.ROUTER_PROVIDERS;
//   let MenuComponent = app.MenuComponent; // app.moduleName.componentName;

//   class AppComponent {
//     constructor(dynamicComponentLoader, viewContainerRef, injector) {
//       this.dynamicComponentLoader = dynamicComponentLoader;
//       this.viewContainerRef = viewContainerRef;
//       this.injector = injector;
//       console.log('app init');
//       console.log(this.viewContainerRef);
//     }

//     loadComponent(component) {
//       this.viewContainerRef.clear();
//       this.dynamicComponentLoader.loadAsRoot(component, '#component-container', this.injector)
//         .then((componentRef) => {
//           componentRef.changeDetectorRef.detectChanges();
//           componentRef.onDestroy(() => {
//             componentRef.changeDetectorRef.detach();
//           });
//           return componentRef;
//         });
//       // this.dynamicComponentLoader.loadAsRoot(component, this.viewContainerRef, this.injector);
//     }

//     test() {
//       class TestComponent {
//         constructor() {
//           this.abc = 'Ya!';
//           console.log('test init');
//         }
//         gg(v) {
//           alert('dynamic' + v);
//         }
//       }
//       TestComponent.annotations = [
//         new ng.core.Component({
//           selector: 'test',
//           template: `
// <h1 (click)="gg(abc)">TestBB</h1> <span>A{{abc}}B</span>
//       `
//         })
//       ];

//       this.loadComponent(TestComponent);
//     }
//   }

//   AppComponent.annotations = [
//     new ng.core.Component({
//       selector: 'nk-app',
//       templateUrl: '/src/core/components/app/app.html',
//       directives: [ROUTER_DIRECTIVES, MenuComponent],
//       providers: [ROUTER_PROVIDERS]
//     }),
//     new ng.router.Routes([{
//       path: '/home',
//       component: app.HomeComponent
//     }, {
//         path: '/about',
//         component: app.AboutComponent
//       }])
//   ];

//   AppComponent.parameters = [
//     ng.core.DynamicComponentLoader,
//     ng.core.ViewContainerRef,
//     ng.core.Injector
//   ];

//   app.AppComponent = AppComponent;
//   window.NewkitApp = app;
// })(window.ng, window.NewkitApp || {});