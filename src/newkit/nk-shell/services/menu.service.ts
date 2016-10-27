import { Injectable } from '@angular/core';

@Injectable()
export class MenuService {

  constructor() { }

  getMenuData() {
    return [{
      icon: 'fa fa-cogs', name: 'Control Panel',
      children: [{
        icon: 'fa fa-wrench', name: 'Maintain',
        // url: '/',
        children: [{
          icon: 'fa fa-file', name: 'Menu Setting', url: '/system/menu-setting', isNg1: true
        }, {
          icon: 'fa fa-search', name: 'Global Search', url: '/system/global-search', isNg1: true,
        }, {
          icon: 'fa fa-rss', name: 'Deploy Module', url: '/system/deploy', isNg1: true
        }]
      }, {
        icon: 'fa fa-home', name: 'Home(Test)', url: 'nkShell.home'
      }]
    }, {
      icon: 'fa fa-link', name: 'Global Configuration', url: '/system/global-configuration', isNg1: true
    }, {
      icon: 'fa fa-plus', name: 'Comp1', url: '/nk-common/comp1'
    }, {
      icon: 'fa fa-plus', name: 'Not Found', url: '/nk-common/test'
    }, {
      icon: 'fa fa-plus', name: 'NK Test Page1', url: '/nk-test/page1'
    }, {
      icon: 'fa fa-star', name: 'Kendo Demo',
      children: [{
        icon: 'fa fa-plus', name: 'Kendo Buttons',
        children: [{
          icon: 'fa fa-plus', name: 'Button', url: '/nk-demo/buttons/button'
        }, {
          icon: 'fa fa-plus', name: 'Button Group', url: '/nk-demo/buttons/button-group'
        }]
      }, {
        icon: 'fa fa-plus', name: 'Kendo Charts',
        children: [{
          icon: 'fa fa-plus', name: 'Chart', url: '/nk-demo/charts/chart'
        }]
      }, {
        icon: 'fa fa-plus', name: 'Kendo Dialogs',
        children: [{
          icon: 'fa fa-plus', name: 'Dialog', url: '/nk-demo/dialogs/dialog'
        }]
      }, {
        icon: 'fa fa-plus', name: 'Kendo DropDowns',
        children: [{
          icon: 'fa fa-plus', name: 'DropDownList', url: '/nk-demo/dropdowns/dropdownlist'
        }, {
          icon: 'fa fa-plus', name: 'ComboBox', url: '/nk-demo/dropdowns/combobox'
        }]
      }, {
        icon: 'fa fa-plus', name: 'Kendo Grids',
        children: [{
          icon: 'fa fa-plus', name: 'Grid', url: '/nk-demo/grids/grid'
        }, {
          icon: 'fa fa-plus', name: 'Grid2', url: '/nk-demo/grids/grid2'
        }]
      }, {
        icon: 'fa fa-plus', name: 'Kendo Inputs',
        children: [{
          icon: 'fa fa-plus', name: 'Swtich', url: '/nk-demo/inputs/switch'
        }, {
          icon: 'fa fa-plus', name: 'Slider', url: '/nk-demo/inputs/slider'
        }]
      }]
    }];
  }
}