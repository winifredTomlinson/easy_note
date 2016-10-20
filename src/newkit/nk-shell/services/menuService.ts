import { Injectable } from '@angular/core';

@Injectable()
export class MenuService {

  constructor() { }

  getMenuData() {
    return [{
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
      }, {
        icon: 'fa fa-home',
        name: 'Home(Test)',
        url: 'nkShell.home'
      }]
    }, {
      icon: 'fa fa-link',
      name: 'Global Configuration',
      url: 'nkShell.globalConfiguration',
      children: []
    }, {
      icon: 'fa fa-plus',
      name: 'Comp1',
      url: '/nk-common/comp1'
    }, {
      icon: 'fa fa-plus',
      name: 'Not Found',
      url: '/nk-common/test'
    }, {
      icon: 'fa fa-plus',
      name: 'NK Test Page1',
      url: '/nk-test/page1'
    }];
  }
}