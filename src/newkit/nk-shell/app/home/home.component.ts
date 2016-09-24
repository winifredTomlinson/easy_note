import {Component} from '@angular/core';
import {UIROUTER_DIRECTIVES} from "ui-router-ng2";

@Component({
  selector: 'nk-home',
  template: require('./home.html')
})

export class HomeComponent {
  private data:any = {a: 1, b: 2};
  constructor() {
    console.log('home init');
  }
} 