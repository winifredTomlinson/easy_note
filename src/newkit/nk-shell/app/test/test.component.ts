import { Component, Injectable, OnInit } from '@angular/core';

import { NegGlobalConfig } from './../../../nk-core';

@Component({
  moduleId: module.id,
  selector: 'nk-shell-test',
  template: require('./test.component.html')
})
@Injectable()
export class ServicesTestComponent implements OnInit {
  public systemName:string;
  constructor(
    private negGlobalConfig: NegGlobalConfig
  ) {

  }

  ngOnInit() { }

  testGlobalConfig() {
    this.negGlobalConfig.get('newkit', 'SystemName')
    .then(data => {
      this.systemName = data;
    });
  }
}