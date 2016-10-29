import { Component, Injectable, Input, ElementRef, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import { NegEventBus, NegBreadcrumb } from 'newkit/core';

@Component({
  selector: '[nk-menu]',
  templateUrl: './menu.html',
  styleUrls: [
    './menu.css'
  ]
})

@Injectable()
export class MenuComponent implements OnInit, OnDestroy {

  @Input('nk-menu')
  private menuData: Array<any>;

  private subs: any = [];

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
      if (x.SubMenus && x.SubMenus.length > 0) {
        this.clearMenuActive(x.SubMenus);
      }
    });
  }

  public setCurrentMenu(url: string) {
    if (_.isArray(this.menuData)) {
      this.isCurrentMenu(this.menuData, url);
    }
  }

  public menuClick(evt, menu: any, m2?: any, m3?: any): void {
    evt.preventDefault();
    evt.stopPropagation();
    if (menu.SubMenus && menu.SubMenus.length > 0) {
      this.menuCollapse(menu);
    } else {
      let url = menu.Url;
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
      if (menu.isNg1 !== false) {
        return;
      }
      if (url) {
        this.router.navigate([url]);
      }
    }
  }

  private getIconClass(icon){
    return (icon || '').replace('icon', 'fa');
  }

  private isCurrentMenu(menus, url: string): boolean {
    for (let i = 0, len = menus.length; i < len; i++) {
      if (menus[i].SubMenus && menus[i].SubMenus.length > 0) {
        let find = this.isCurrentMenu(menus[i].SubMenus, url);
        if (find) {
          menus[i].open = true;
          return find;
        }
      } else {
        if (menus[i].Url === url) {
          menus[i].active = true;
          return true;
        }
      }
    }
    return false;
  }

  private menuCollapse(menu: any, isOpen?: boolean): void {
    menu.open = isOpen === undefined ? !menu.open : isOpen;
    if (menu.SubMenus && menu.SubMenus.length > 0 && !menu.open) {
      menu.SubMenus.forEach(item => this.menuCollapse(item, menu.open));
    }
  }
}