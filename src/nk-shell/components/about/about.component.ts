import {Component} from '@angular/core';

@Component({
  selector: 'nk-about',
  template: 'html-template - About {{aaaa}}'
})
export class AboutComponent {
  private aaaa: string;
  constructor() {
    console.log('about init');
    this.aaaa = 'abc';
  }
}