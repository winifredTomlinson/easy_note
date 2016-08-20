import { Component, OnInit, AfterContentInit } from '@angular/core';
import { DomSanitizationService, SafeResourceUrl } from '@angular/platform-browser';
import { UIROUTER_DIRECTIVES } from 'ui-router-ng2';

import { NegEventBus } from './../nk-core';
import { MenuComponent } from './components';

@Component({
  moduleId: module.id,
  selector: 'nk-app',
  template: require('./app.component.html'),
  styles: [require('./app.component.styl')],
  directives: [UIROUTER_DIRECTIVES, MenuComponent]
})
export class AppComponent implements OnInit, AfterContentInit {

  private menuData: Array<any>;

  public currentIsNg1Module: boolean = false;
  public ng1PageSrc: SafeResourceUrl;
  public iframeHeight: string;

  constructor(
    private sanitizer: DomSanitizationService,
    private negEventBus: NegEventBus
  ) { }

  ngOnInit() {
    this.ng1PageSrc = this.sanitizer.bypassSecurityTrustResourceUrl('');

    window.addEventListener('message', evt => {
      this._processMessageEvent(evt);
    }, false);

    this.negEventBus.on('nkShell.menuChanged', data => {
      this._processMenuChanged(data);
    });

    this._init();
  }

  _processMessageEvent(evt: any) {
    let msg = evt.data;
    if (typeof msg !== 'object' || msg.eventName) {
      return;
    }
    if (msg.eventName === 'resize') {
      this.iframeHeight = msg.data + 'px';
      return;
    }
    // 拉取上下文信息（权限，UserProfile）
    if (msg.eventName === 'pullContext') {
      debugger
      let iframeWindow: Window = (document.getElementById('iframe-for-ng1-page') as HTMLIFrameElement).contentWindow;
      iframeWindow.postMessage({
        eventName: 'pushContext',
        data: ''
      }, '*');
      return;
    }
    if (msg.eventName === 'redirect') {
      console.log('redirect');
      return;
    }
  }

  _processMenuChanged(menu) {
    this.currentIsNg1Module = menu.isNg1;
    if (this.currentIsNg1Module) {
      let url = `http://10.16.85.170:8888${menu.url}?theme=core`;
      // let url = 'http://10.16.85.170:8000/t.html';
      this.ng1PageSrc = this.sanitizer.bypassSecurityTrustResourceUrl(url);
    }
  }

  _init() {
    this.menuData = [{
      icon: 'fa fa-cogs',
      name: 'Control Panel',
      // url: '/home',
      children: [{
        icon: 'fa fa-wrench',
        name: 'Maintain',
        // url: '/',
        children: [{
          icon: 'fa fa-file',
          name: 'Menu Setting',
          // url: 'nkShell.menuSetting',
          url: '/system/menu-setting',
          active: true,
          isNg1: true
        }, {
            icon: 'fa fa-search',
            name: 'Global Search',
            url: '/system/global-search',
            // url: 'nkShell.globalSearch',
            isNg1: true,
          }, {
            icon: 'fa fa-rss',
            name: 'Deploy Module',
            // url: 'nkShell.deploy',
            url: '/system/deploy',
            isNg1: true
          }]
      }]
    }, {
        icon: 'fa fa-link',
        name: 'Global Configuration',
        url: 'nkShell.globalConfiguration',
        children: []
      }, {
        icon: 'fa fa-plus',
        name: 'Comp1',
        url: 'nkCommon.comp1'
      }, {
        icon: 'fa fa-plus',
        name: 'Not Found',
        url: 'nkCommon.test'
      }];
  }

  ngAfterContentInit() {
    $(function () {
      $('.nk-menu li').on('click', function (e) {
        var $this = $(this);
        $this[$this.hasClass('open') ? 'removeClass' : 'addClass']('open');
        if ($this.find('ul').length === 0) {
          $('.nk-menu li').removeClass('active');
          $this.addClass('active').parents('li').addClass('active');
        }
        return false;
      });
    });
  }

}