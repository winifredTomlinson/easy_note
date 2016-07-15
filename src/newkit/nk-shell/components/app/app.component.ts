import {Component, Injectable, DynamicComponentLoader, ViewContainerRef, Injector, Inject} from '@angular/core';
import {CrossDomainMessage} from './../../services/crossDomainMessage';

import {MenuComponent} from './menu.component';

import {HomeComponent} from './../home/home.component';
import {AboutComponent} from './../about/about.component';

@Component({
  selector: 'nk-shell',
  template: require('./app.html'),
  directives: [MenuComponent],
  styles: [require('./app.css')],
  providers: [CrossDomainMessage]
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
    @Inject(Injector) private injector: Injector,
    @Inject(CrossDomainMessage) private crossDomainMessage: CrossDomainMessage
  ) {
    crossDomainMessage.init();
    crossDomainMessage.register('iframe', (evt) => {
      alert('abc');
    });
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

  private refreshPage(): void {
    window.alert('reload');
  }
}