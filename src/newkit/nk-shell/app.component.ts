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

  _init(){
    this.menuData = [{
      icon: 'fa fa-home',
      name: 'Home',
      // url: '/home',
      children: [{
        icon: 'fa fa-lock',
        name: 'AAAA',
        // url: '/',
        children: [{
          icon: 'fa fa-file',
          name: '第三级菜单，很长很长很长很长很长很长很长',
          // url: '/',
          children: [{
            icon: 'fa fa-file',
            name: '第四级菜单很长很长很长很长行阿萨德发送发到发发到',
            url: 'nkShell.home',
            active: true
          }]
        }]
      }]
    }, {
        icon: 'fa fa-link',
        name: 'About',
        url: 'nkShell.about',
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