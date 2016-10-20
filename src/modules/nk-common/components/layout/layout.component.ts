import {Component} from '@angular/core';

@Component({
  selector: 'nk-common-layout',
  template: '<div class="nk-common"><router-outlet></router-outlet></div>'
})
export class LayoutComponent {
  constructor() {
    console.log('nk-common layout init.');
  }
}