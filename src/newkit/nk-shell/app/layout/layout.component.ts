import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'nk-shell-layout',
  template: '<div class="nk-shell"><ui-view></ui-view></div>'
})
export class LayoutComponent implements OnInit {
  constructor() {
    console.log('nk-shell layout init.');
  }

  ngOnInit() {

  }
}