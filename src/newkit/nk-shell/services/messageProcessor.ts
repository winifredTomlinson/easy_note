import { Injectable } from '@angular/core';

import { AppComponent } from './../app.component';

@Injectable()
export class MessageProcessor {

  private app: AppComponent;

  constructor() {

  }

  init(app: AppComponent) {
    this.app = app;
  }

  public sendMessageEvent(eventName: string, data?: any) {
    try {
      let iframeWindow = (document.getElementById('iframe-for-ng1-page') as HTMLIFrameElement).contentWindow;
      iframeWindow.postMessage({
        eventName: eventName,
        data: data
      }, '*');
      return true;
    } catch (e) {
      return false;
    }
  }

  public processMessage(evt: any) {
    let app = this.app;
    let msgObj = evt.data;
    if (typeof msgObj !== 'object' || !msgObj.eventName) {
      return;
    }
    this.app.negEventBus.emit(`postMessage.${msgObj.eventName}`, msgObj.data);
    switch (msgObj.eventName) {
      case 'resize':
        this._processResize(msgObj.data);
        break;
      case 'pullContext': //拉取上下文信息（权限，UserProfile）
        this._pushContext();
        break;
      case 'loading.show':
      case 'loading.hide':
        this._processLoading(msgObj.eventName === 'loading.show');
        break;
      case 'progress.start':
      case 'progress.done':
        this._processProgress(msgObj.eventName === 'progress.start')
        break;
      case 'redirect':
        this._processRedirect();
        break;
      case 'router-change-success':
        console.log('hash=', msgObj.data);
        window.location.hash = msgObj.data;
        break;
    }
  }

  private _processResize(height) {
    this.app.iframeHeight = height + 'px';
  }

  private _pushContext() {
    this.sendMessageEvent('pushContext', this.app.negAuth.getAuthData());
  }

  private _processLoading(isShown: boolean) {
    if (isShown) {
      this.app.negGlobalLoading.show();
      return;
    }
    this.app.negGlobalLoading.hide();
  }

  private _processProgress(isStart: boolean) {
    if (isStart) {
      this.app.negProgress.start();
      return;
    }
    this.app.negProgress.done();
  }

  private _processRedirect() {

  }
}