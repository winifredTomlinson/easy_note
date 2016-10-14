import { Component, Injectable, Input, AfterViewInit } from '@angular/core';
import { UIRouter } from 'ui-router-ng2';

import { NegEventBus } from './../../../nk-core';

@Component({
  selector: '[nk-menu]',
  templateUrl: './menu.html',
  // styles: [require('!raw!./menu.css')]
})

@Injectable()
export class MenuComponent implements AfterViewInit {

  @Input() private menuData: Array<any>;

  constructor(private uiRouter: UIRouter, private negEventBus: NegEventBus) {
  }

  ngAfterViewInit(){
    console.log(this.menuData);
  }

  public menuCollapse(menu: any, evt?: any): void {
    menu.open = !menu.open;
    if (evt) {
      evt.preventDefault();
      evt.stopPropagation();
    }
  }

  public menuClick(menu: any): void {
    if (menu.children && menu.children.length > 0) {
      this.menuCollapse(menu);
    } else {
      let url = menu.url;
      this.negEventBus.emit('nkShell.menuChanged', menu);
      if(menu.isNg1){
        return;
      }
      if (url) {
        menu.active = true;
        this.uiRouter.stateService.go(url, null, null);
      }
    }
  }
}