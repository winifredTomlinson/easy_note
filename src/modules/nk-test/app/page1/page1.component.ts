import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'selector',
  templateUrl: 'page1.html'
})
export class Page1Component implements OnInit {
  constructor() { }

  private gridData: any[] = [{
    "ProductID": 1,
    "ProductName": "Chai",
    "UnitPrice": 18.0000,
    "Discontinued": false
  }];

  ngOnInit() { }

  public onButtonClick() {
    alert('test');
  }
}