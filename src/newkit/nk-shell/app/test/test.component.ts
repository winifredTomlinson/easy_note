import { Component, Injectable, OnInit } from '@angular/core';

import { NegGlobalConfig, NegConfigService, NegDfisUploader, NegEventBus, NegTracker, NegStorage } from './../../../nk-core';

@Component({
  moduleId: module.id,
  selector: 'nk-shell-test',
  template: require('./test.component.html')
})
@Injectable()
export class ServicesTestComponent implements OnInit {

  private eventId: any;
  private tracker: any;

  public systemName: string;
  public newkitConfig: any;
  public file1: File;
  public fileUrl: string;
  public st = { storageType: 'cookie', storageName: 'test', storageValue: 'testvalue' };

  constructor(
    private negGlobalConfig: NegGlobalConfig,
    private negConfigService: NegConfigService,
    private negDfisUploader: NegDfisUploader,
    private negEventBus: NegEventBus,
    private negTracker: NegTracker,
    private negStorage: NegStorage
  ) {

  }

  ngOnInit() {
    this.eventId = this.negEventBus.on('event.test', data => {
      alert(data);
    });
  }

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

  public onChange(evt) {
    this.file1 = evt.srcElement.files[0];
  }

  public testDfisUploader() {
    let url = `http://neg-app-dfis:8200/MISInternal/DocumentTool/newkit-test.jpg`;
    this.negDfisUploader.upload(url, this.file1)
      .then(fileUrl => {
        this.fileUrl = fileUrl;
      })
  }

  public testEmitEvent() {
    this.negEventBus.emit('event.test', 'hahhahahhahah，我的Event Data.');
  }

  public testUnSubscribeEvent() {
    this.eventId.unsubscribe();
  }

  public testStartTrack() {
    this.tracker = this.negTracker.startTrack('Test', 'Click', 'test test click', 'jh3r');
  }

  public testEndTack() {
    this.tracker.end();
    alert('over');
  }

  public setStorageValue() {
    this.negStorage[this.st.storageType].set(this.st.storageName, this.st.storageValue);
  }

  public getStorageValue() {
    let value = this.negStorage[this.st.storageType].get(this.st.storageName);
    alert(value);
  }

  public removeStorageValue() {
    this.negStorage[this.st.storageType].remove(this.st.storageName);
  }

  public clearStorage() {
    this.negStorage[this.st.storageType].clear();
  }
}