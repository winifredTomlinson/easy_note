import { Component, OnInit } from '@angular/core';

@Component({
  template: require('./button-group.component.html')
})
export class ButtonGroupComponent implements OnInit {

  private isDisabled: boolean = false;

  private selection: string = 'single'

  constructor() { }

  ngOnInit() { }
}