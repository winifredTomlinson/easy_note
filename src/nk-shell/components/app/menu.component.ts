import {Component, Injectable, Inject} from '@angular/core';
import {ROUTER_DIRECTIVES, Router} from '@angular/router';

@Component({
  selector: 'nk-menu',
  template: require('./menu.html'),
  directives: [ROUTER_DIRECTIVES],
  styles: [require('./menu.css')]
})
export class MenuComponent {
  private menuData: Array<any>;
  constructor( @Inject(Router) private router: Router) {
    this.initMenuData();
  }

  private menuCollapse(menu: any, evt?: any): void {
    menu.open = !menu.open;
    if (evt) {
      evt.preventDefault();
      evt.stopPropagation();
    }
  }

  private menuClick(menu: any): void {
    if (menu.children && menu.children.length > 0) {
      this.menuCollapse(menu);
    } else {
      let url = menu.url;
      if (url) {
        menu.active = true;
        this.router.navigate([url]);
      }
    }
  }

  private initMenuData(): void {
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
            url: '/home',
            active: true
          }]
        }]
      }]
    }, {
        icon: 'fa fa-link',
        name: 'About',
        url: '/about',
        children: []
      }];
  }
}