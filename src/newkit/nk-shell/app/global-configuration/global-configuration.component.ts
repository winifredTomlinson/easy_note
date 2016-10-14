import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'nk-shell-global-configuration',
  templateUrl: './global-configuration.html'
})
export class GlobalConfigurationComponent implements OnInit {
  constructor() { } 

  ngOnInit() { }

  private onButtonClick(){
    alert('abc');
  }

}