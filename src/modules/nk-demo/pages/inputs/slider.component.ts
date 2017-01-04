import { Component, OnInit } from '@angular/core';

@Component({
  template: require('./slider.component.html')
})
export class SliderComponent implements OnInit {

  public value: number = 5;
  public min: number = 0;
  public max: number = 10;
  public smallStep: number = 1;

  public tickPlacement: string = 'none';

  constructor() { }

  ngOnInit() { }

  public title(value): string {
    return (this.value % 2).toString();
  }

}