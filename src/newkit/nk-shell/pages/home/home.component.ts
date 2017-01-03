import {Component} from '@angular/core';

@Component({
  selector: 'nk-home',
  templateUrl: './home.html'
})

export class HomeComponent {
  private data:any = {a: 1, b: 2};
  constructor() {
    console.log('home init');
  }
} 