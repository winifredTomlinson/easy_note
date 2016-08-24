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

  public processMessage(evt: any) {
    let app = this.app;
    let msgObj = evt.data;
    console.log(msgObj);
    if (typeof msgObj !== 'object' || !msgObj.eventName) {
      return;
    }
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
      case 'redirect':
        this._processRedirect();
        break;
    }
  }

  private _processResize(height) {
    this.app.iframeHeight = height + 'px';
  }

  private _pushContext() {
    let iframeWindow = (document.getElementById('iframe-for-ng1-page') as HTMLIFrameElement).contentWindow;
    iframeWindow.postMessage({
      eventName: 'pushContext',
      data: ''
    }, '*');
  }

  private _processLoading(isShown: boolean) {
    if (isShown) {
      this.app.negGlobalLoading.show();
      return;
    }
    this.app.negGlobalLoading.hide();
  }

  private _processRedirect() {

  }
}