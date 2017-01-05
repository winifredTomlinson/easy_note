import { Component, OnInit } from '@angular/core';

import { NegAjax } from 'newkit/core';

@Component({
  template: 'Page12'
})
export class Page1Component implements OnInit {
  constructor(
    private negAjax: NegAjax
  ) { }

  ngOnInit() { 
    alert('Page init');
  }
}
