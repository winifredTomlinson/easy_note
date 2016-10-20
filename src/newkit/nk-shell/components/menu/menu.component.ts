import { Component, Injectable, Input, ElementRef, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';

import { NegEventBus, NegBreadcrumb } from './../../../nk-core';

@Component({
  selector: '[nk-menu]',
  templateUrl: './menu.html'
})

@Injectable()
export class MenuComponent implements OnInit {

  @Input('nk-menu')
  private menuData: Array<any>;

  constructor(
    private elementRef: ElementRef,
    private router: Router,
    private negEventBus: NegEventBus,
    private negBreadcrumb: NegBreadcrumb
  ) {
  }

  ngOnInit() {
    this.elementRef.nativeElement.className = 'nk-menu';
  }

  public menuClick(evt, menu: any, m2?: any, m3?: any): void {
    evt.preventDefault();
    evt.stopPropagation();
    if (menu.children && menu.children.length > 0) {
      this.menuCollapse(menu);
    } else {
      let url = menu.url;
      let breadcrumbs = [menu.name];
      if (m2) {
        breadcrumbs.unshift(m2.name);
      }
      if (m3) {
        breadcrumbs.unshift(m3.name);
      }
      this.negBreadcrumb.setBreadcrumbs(breadcrumbs);
      this.negEventBus.emit('nkShell.menuChanged', menu);
      if (menu.isNg1) {
        return;
      }
      if (url) {
        menu.active = true;
        this.router.navigate([url]);
      }
    }
  }

  private menuCollapse(menu: any, isOpen?: boolean): void {
    menu.open = isOpen === undefined ? !menu.open : isOpen;
    if (menu.children && menu.children.length > 0 && !menu.open) {
      menu.children.forEach(item => this.menuCollapse(item, menu.open));
    }
  }
}