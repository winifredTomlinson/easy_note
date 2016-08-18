import { Component, Injectable, OnInit } from '@angular/core';

import { NegGlobalConfig, NegConfigService, NegDfisUploader } from './../../../nk-core';

@Component({
  moduleId: module.id,
  selector: 'nk-shell-test',
  template: require('./test.component.html')
})
@Injectable()
export class ServicesTestComponent implements OnInit {
  public systemName: string;
  public newkitConfig: any;
  public file1: File;
  public fileUrl: string;
  constructor(
    private negGlobalConfig: NegGlobalConfig,
    private negConfigService: NegConfigService,
    private negDfisUploader: NegDfisUploader
  ) {

  }

  ngOnInit() { }

  public testGlobalConfig() {
    this.negGlobalConfig.get('newkit', 'SystemName')
      .then(data => {
        this.systemName = data;
      });
  }

  public testConfigService() {
    this.negConfigService.get('bts', 'newkit-config')
      .then(data => {
        this.newkitConfig = JSON.parse(data);
      });
  }

  public onChange(evt){
    this.file1 = evt.srcElement.files[0];
  }

  public testDfisUploader() {
    let url = `http://neg-app-dfis:8200/MISInternal/DocumentTool/newkit-test.jpg`;
    this.negDfisUploader.upload(url, this.file1)
      .then(fileUrl => {
        this.fileUrl = fileUrl;
      })
  }
}