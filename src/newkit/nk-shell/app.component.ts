import { Component, OnInit, AfterContentInit } from '@angular/core';
import { UIROUTER_DIRECTIVES } from 'ui-router-ng2';
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

  constructor() { }

  ngOnInit() {
    this._init();
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
          url: 'nkShell.menuSetting',
          active: true
        }, {
            icon: 'fa fa-search',
            name: 'Global Search',
            url: 'nkShell.globalSearch'
        }, {
            icon: 'fa fa-rss',
            name: 'Deploy Module',
            url: 'nkShell.deploy'
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