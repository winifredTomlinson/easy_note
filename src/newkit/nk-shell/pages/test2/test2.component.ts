import { Component, OnInit } from '@angular/core';

@Component({
  templateUrl: 'test2.component.html'
})
export class Test2Component implements OnInit {
  
  private selectIndex = 1;
  
  constructor() { }

  ngOnInit() { }

  testFn(){
    alert('test');
  }
}