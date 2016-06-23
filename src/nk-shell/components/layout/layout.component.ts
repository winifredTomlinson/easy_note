import {Component} from '@angular/core';

@Component({
  selector: 'nk-shell-layout',
  template: '<div class="nk-shell"><ui-view></ui-view></div>'
})
export class LayoutComponent {
  constructor() {
    console.log('nk-shell layout init.');
  }
}