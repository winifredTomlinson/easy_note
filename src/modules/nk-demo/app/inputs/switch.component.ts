import { Component, OnInit } from '@angular/core';

@Component({
  template: require('./switch.component.html')
})
export class SwitchComponent implements OnInit {

  private checked: boolean = true;
  
  private disabled: boolean = true;

  constructor() { }

  ngOnInit() { }

}