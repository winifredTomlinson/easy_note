import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'nk-shell-global-configuration',
  templateUrl: './global-configuration.html'
})
export class GlobalConfigurationComponent implements OnInit {

  private v:string = '10';

  constructor() { } 

  ngOnInit() { }

  private onButtonClick(){
    alert('abc');
  }

}