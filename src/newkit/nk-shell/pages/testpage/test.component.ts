import { Component, Injectable, OnInit } from '@angular/core';

import { NegGlobalConfig, NegConfigService, NegDfisUploader,
  NegEventBus, NegTracker, NegStorage, NegUserProfile,
  NegGlobalLoading, NegProgress, NegAlert
} from 'newkit/core';

@Component({
  selector: 'nk-shell-test',
  templateUrl: './test.component.html'
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
  private alert: { type: string, message: string, opt?: string } = {
    type: 'info', message: 'Hello', opt: JSON.stringify({
      icon: 'info',
      shift: 1,
      title: 'test'
    }, null, '\t')
  };

  constructor(
    private negGlobalConfig: NegGlobalConfig,
    private negConfigService: NegConfigService,
    private negDfisUploader: NegDfisUploader,
    private negEventBus: NegEventBus,
    private negTracker: NegTracker,
    private negStorage: NegStorage,
    private negUserProfile: NegUserProfile,
    private negGlobalLoading: NegGlobalLoading,
    private negProgress: NegProgress,
    private negAlert: NegAlert
  ) {

  }

  ngOnInit() {
    this.eventId = this.negEventBus.on('event.test', data => {
      alert(data);
    });
    this.negUserProfile.init('jh3r')
      .then(() => {
        let value = this.negUserProfile.get('system');
      });
  }

  public testNegAlert() {
    this.negAlert[this.alert.type](this.alert.message, JSON.parse(this.alert.opt), () => {
      this.negAlert.info('EN');
    }, () => {
      this.negAlert.error('Not');
      return false;
    });
  }

  public testNegAlertPrompt() {
   alert('not support');
  }

  public testNegAlertNotice() {
    alert('not support');
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

  public testGetProfile() {
    let value = this.negUserProfile.get('abc');
    alert(JSON.stringify(value));
  }

  public testSetProfile() {
    this.negUserProfile.set('abc', { nice: true });
  }

  public testDeleteProfile() {
    this.negUserProfile.remove('abc');
  }

  public testStartGlobalLoading() {
    this.negGlobalLoading.show('这是一个测试');
    setTimeout(() => {
      this.negGlobalLoading.hide();
    }, 3000);
  }

  public testStartProgress() {
    this.negProgress.start();
    setTimeout(() => {
      this.negProgress.done();
    }, 3000);
  }
}