import { Component, OnInit } from '@angular/core';
import { NegAjax, NegAuth } from 'newkit/core';

@Component({
  templateUrl: './menu-setting.html'
})
export class MenuSettingComponent implements OnInit {

  private menuData: Array<any> = [];
  private ajaxOpt: {};
  constructor(
    private negAjax: NegAjax,
    private negAuth: NegAuth
  ) { }

  ngOnInit() {
    this.ajaxOpt = { headers: { 'x-newkit-token': this.negAuth.getAuthData().newkitToken } };
    this._loadMenu();
  }

  _loadMenu() {
    this.negAjax.get(`${NewkitConf.NewkitAPI}/menu`, this.ajaxOpt)
      .then(res => {
        let menus = res.json().data.rows;
        console.log(menus);
        this.menuData = menus;
        // let menuData = res.json().menuData;
        // menuData.forEach((item) => item.$$root = true);
        // this.menuData = this._convertMenuDataToTreeData(menuData);
        // console.log(this.menuData);
      })
  }

  _convertMenuDataToTreeData(menuData): Array<any> {
    let treeData = [];
    if (menuData && menuData.length > 0) {
      menuData.forEach(item => {
        let menu: any = {
          data: {}
        };
        Object.keys(item).forEach(key => {
          if (key !== 'SubMenus') {
            menu.data[key] = item[key];
          }
        });
        if (item.SubMenus) {
          menu.children = this._convertMenuDataToTreeData(item.SubMenus);
        }
        treeData.push(menu);
      });
    }
    return treeData;
  }
}