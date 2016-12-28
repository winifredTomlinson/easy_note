import { Component, OnInit } from '@angular/core';
import { NegAjax, NegAuth, NegAlert } from 'newkit/core';

@Component({
  templateUrl: './menu-setting.html',
  styleUrls: ['./menu-setting.css']
})
export class MenuSettingComponent implements OnInit {

  private menuData: Array<any> = [];
  private ajaxOpt: {};
  private isModalShown: boolean = false;

  constructor(
    private negAjax: NegAjax,
    private negAuth: NegAuth,
    private negAlert: NegAlert
  ) { }

  ngOnInit() {
    this.ajaxOpt = { headers: { 'x-newkit-token': this.negAuth.getAuthData().newkitToken } };
    this._loadMenu();
  }

  doMenuOperate(evt, opType, menu) {
    evt.stopPropagation();
    switch (opType) {
      case 'edit':
        this.doMenuEdit(menu);
        break;
      case 'addChild':
        this.doMenuAdd(menu);
        break;
      case 'delete':
        this.doMenuDelete(menu);
        break;
    }
  }

  doMenuAdd(menu) {
    this.isModalShown = true;
  }

  doMenuEdit(menu) {

  }

  saveMenu(): Promise<any> {
    alert('add');
    return Promise.resolve(false);
  }

  doMenuDelete(menu) {
    this.negAlert.confirm('Sure to delete the menu?', () => {
      this.negAjax.delete(`${NewkitConf.NewkitAPI}/menu/${menu.id}`, this.ajaxOpt)
        .then(data => {
          this._loadMenu();
          this.negAlert.info('Delete menu successfully.');
        });
    }, null);
  }

  _loadMenu() {
    this.negAjax.get(`${NewkitConf.NewkitAPI}/menu`, this.ajaxOpt)
      .then(res => {
        let menus = res.json().data.rows;
        let result = [];
        this.processMenuData(menus, result, '');
        this.menuData = result;
        console.log(result);
      })
  }

  processMenuData(source, target, parentId, level = 0): void {
    let arr = source.filter(x => x.parentId === parentId);
    arr.forEach(m => {
      m.level = level;
      target.push(m);
      this.processMenuData(source, target, m.id, level + 1);
    });
  }
}