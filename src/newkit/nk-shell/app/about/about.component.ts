import { Component } from '@angular/core';

@Component({
  templateUrl: './about.html'
})
export class AboutComponent {

  private version: string = NewkitConf.version;
  
  constructor() {
  }
}