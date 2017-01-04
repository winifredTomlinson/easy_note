import { Component, OnInit } from '@angular/core';

@Component({
  template: require('./button.component.html')
})
export class ButtonComponent implements OnInit {

  private imageUrl: string = 'http://demos.telerik.com/kendo-ui/content/shared/icons/sports/snowboarding.png';

  constructor() { }

  ngOnInit() { }

  public onButtonClick() {
    alert('click button');
  }
}