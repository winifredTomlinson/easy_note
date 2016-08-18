import { Component, Injectable, OnInit } from '@angular/core';

import { NegGlobalConfig, NegConfigService } from './../../../nk-core';

@Component({
  moduleId: module.id,
  selector: 'nk-shell-test',
  template: require('./test.component.html')
})
@Injectable()
export class ServicesTestComponent implements OnInit {
  public systemName:string;
  public newkitConfig: any;
  constructor(
    private negGlobalConfig: NegGlobalConfig,
    private negConfigService: NegConfigService
  ) {

  }

  ngOnInit() { }

  public testGlobalConfig() {
    this.negGlobalConfig.get('newkit', 'SystemName')
    .then(data => {
      this.systemName = data;
    });
  }

  public testConfigService(){
    this.negConfigService.get('bts', 'newkit-config')
    .then(data => {
      this.newkitConfig = JSON.parse(data);
    });
  }
}