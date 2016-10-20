import { Component, Injectable, Input, ElementRef, OnInit, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';

import { NegEventBus } from './../../../nk-core';

@Component({
  selector: '[nk-menu]',
  templateUrl: './menu.html',
  // styles: [require('!raw!./menu.css')]
})

@Injectable()
export class MenuComponent implements OnInit, AfterViewInit {

  @Input('nk-menu')
  private menuData: Array<any>;

  constructor(
    private elementRef: ElementRef,
    private negEventBus: NegEventBus,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.elementRef.nativeElement.className = 'nk-menu';
  }

  ngAfterViewInit() {
    setTimeout(() => {
      console.log(this.menuData, 'aaa');
    }, 1000);

  }

  public menuClick(evt, menu: any): void {
    evt.preventDefault();
    evt.stopPropagation();
    if (menu.children && menu.children.length > 0) {
      this.menuCollapse(menu);
    } else {
      let url = menu.url;
      this.negEventBus.emit('nkShell.menuChanged', menu);
      if (menu.isNg1) {
        return;
      }
      if (url) {
        menu.active = true;
        this.router.navigateByUrl(url);
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