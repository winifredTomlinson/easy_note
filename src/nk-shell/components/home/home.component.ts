import {Component} from '@angular/core';
import {UIROUTER_DIRECTIVES} from "ui-router-ng2";

@Component({
  selector: 'nk-home',
  template: require('./home.html'),
  directives: [UIROUTER_DIRECTIVES]
})

export class HomeComponent {
  constructor() {
    console.log('home init');
  }
} 