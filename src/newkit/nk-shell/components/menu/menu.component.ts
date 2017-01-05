require('./menu.styl');

import { Component, Injectable, Input, ElementRef, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { NegEventBus, NegBreadcrumb } from 'newkit/core';

@Component({
  selector: '[nk-menu]',
  templateUrl: './menu.html'
})

@Injectable()
export class MenuComponent implements OnInit, OnDestroy {

  @Input('nk-menu')
  private menuData: Array<any>;

  private subs: any = [];
  private breadcrumbMenus: Array<any> = [];

  constructor(
    private elementRef: ElementRef,
    private router: Router,
    private negEventBus: NegEventBus,
    private negBreadcrumb: NegBreadcrumb
  ) {
  }

  ngOnInit() {
    this.elementRef.nativeElement.className = 'nk-menu';
    let sub1 = this.negEventBus.on('global.setCurrentMenu', url => {
      setTimeout(() => {
        this.setCurrentMenu(url);
      }, 200);
    });
    this.subs.push(sub1);
  }

  ngOnDestroy() {
    this.subs.forEach(sub => sub.unsubscribe());
  }

  public clearMenuActive(menus?) {
    menus = menus || this.menuData;
    menus.forEach(x => {
      x.active = false;
      if (x.subMenus && x.subMenus.length > 0) {
        this.clearMenuActive(x.subMenus);
      }
    });
  }

  public setCurrentMenu(url: string) {
    if (_.isArray(this.menuData)) {
      this.isCurrentMenu(this.menuData, url);
      this.negBreadcrumb.setBreadcrumbs(this.breadcrumbMenus);
    }
  }

  public menuClick(evt, menu: any, m2?: any, m3?: any): void {
    evt.preventDefault();
    evt.stopPropagation();
    if (menu.subMenus && menu.subMenus.length > 0) {
      this.menuCollapse(menu);
    } else {
      let url = menu.url;
      let breadcrumbs = [menu];
      if (m2) {
        breadcrumbs.unshift(m2);
      }
      if (m3) {
        breadcrumbs.unshift(m3);
      }
      this.negBreadcrumb.setBreadcrumbs(breadcrumbs);
      this.negEventBus.emit('nkShell.menuChanged', menu);
      this.clearMenuActive();
      menu.active = true;
      if (menu.isNewkit1Page !== false) {
        return;
      }
      if (url) {
        this.router.navigate([url]);
      }
    }
  }

  private isCurrentMenu(menus, url: string): boolean {
    for (let i = 0, len = menus.length; i < len; i++) {
      this.breadcrumbMenus.push(menus[i]);
      if (menus[i].subMenus && menus[i].subMenus.length > 0) {
        let find = this.isCurrentMenu(menus[i].subMenus, url);
        if (find) {
          menus[i].open = true;
          return find;
        }
      } else {
        if (menus[i].url === url) {
          menus[i].active = true;
          return true;
        }
      }
      this.breadcrumbMenus.pop();
    }
    return false;
  }

  private menuCollapse(menu: any, isOpen?: boolean): void {
    menu.open = isOpen === undefined ? !menu.open : isOpen;
    if (menu.subMenus && menu.subMenus.length > 0 && !menu.open) {
      menu.subMenus.forEach(item => this.menuCollapse(item, menu.open));
    }
  }
}
