import { Injectable } from '@angular/core';

import { NegAuth } from 'newkit/core';

@Injectable()
export class MenuService {

  constructor(
    private negAuth: NegAuth
  ) { }

  private _processMenu(menus) {
    menus.forEach(m1 => {
      m1.isNg1 = false;
      m1['en-us'] = m1['zh-cn'] = m1['zh-tw'] = m1.text;
      if (m1.SubMenus) {
        this._processMenu(m1.SubMenus);
      }
    });
  }

  public getMenuData() {
    let menus = _.cloneDeep(NewkitConf.menus);
    this._processMenu(menus);
    console.log(menus);
    return menus;
    // return this.negAuth.authData.menus;
  }
}