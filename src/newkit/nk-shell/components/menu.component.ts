import { Component, Injectable, Input } from '@angular/core';
import { UIRouter } from 'ui-router-ng2';

@Component({
  selector: '[nk-menu]',
  template: require('./menu.html')
  // styles: [require('./menu.css')]
})
@Injectable()
export class MenuComponent {
  @Input() private menuData: Array<any>;

  constructor(private uiRouter: UIRouter) {
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
      if (url) {
        menu.active = true;
        this.uiRouter.stateService.go(url, null, null);
      }
    }
  }
}