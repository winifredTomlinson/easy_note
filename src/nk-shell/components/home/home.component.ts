import {Component} from '@angular/core';

@Component({
  selector: 'nk-home',
  template: require('./home.html')
})

export class HomeComponent {
  constructor() {
    console.log('home init');
  }
} 