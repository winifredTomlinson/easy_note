import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'nk-shell-layout',
  template: '<div class="nk-shell"><router-outlet></router-outlet></div>'
})
export class LayoutComponent implements OnInit {
  constructor() {
    console.log('nk-shell layout init.');
  }

  ngOnInit() {

  }
}