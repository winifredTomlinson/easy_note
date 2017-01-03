import { Component, OnInit } from '@angular/core';
import { NegAjax, NegAuth, NegAlert } from 'newkit/core';
import { MenuIcons } from './menu-icons';

const authTypes = ['public', 'newegg', 'keystone'];

@Component({
  templateUrl: './menu-setting.component.html'
})
export class MenuSettingComponent implements OnInit {

  private menuData: Array<any> = [];
  private ajaxOpt: {};
  private isModalShown: boolean = false;
  private isIconSelectModalShown: boolean = false;
  private menuIcons = MenuIcons;
  private currentMenu: any = {};
  private menuModalTitle: string;
  private systemList: Array<any>;
  private moduleList: Array<any>;
  private applications: Array<any>;
  private matchedModuleList: Array<any>;

  constructor(
    private negAjax: NegAjax,
    private negAuth: NegAuth,
    private negAlert: NegAlert
  ) { }

  ngOnInit() {
    this.ajaxOpt = { headers: { 'x-newkit-token': this.negAuth.getAuthData().newkitToken } };
    this.applications = _.cloneDeep(NewkitConf.Applications);
    this.applications.push({ id: '', name: '' });
    this.loadMenu();
    this.loadSystemAndModule();
  }

  loadMenu() {
    this.negAjax.get(`${NewkitConf.NewkitAPI}/menu`, this.ajaxOpt)
      .then(res => {
        let menus = res.json().data.rows;
        let result = [];
        this.processMenuData(menus, result, '');
        this.menuData = result;
      });
  }

  processMenuData(source, target, parentId, level = 0): void {
    let arr = source.filter(x => x.parentId === parentId).sort((x1, x2) => (x1.sort || 0) - (x2.sort || 0));
    arr.forEach(m => {
      m.level = level;
      target.push(m);
      this.processMenuData(source, target, m.id, level + 1);
    });
  }

  loadSystemAndModule() {
    this.negAjax.get(`${NewkitConf.NewkitAPI}/permission/system`, this.ajaxOpt)
      .then(res => {
        this.systemList = res.json();
      });
    this.negAjax.get(`${NewkitConf.NewkitAPI}/permission/module`, this.ajaxOpt)
      .then(res => {
        this.moduleList = res.json();
      });
  }

  onSystemChange() {
    this.matchedModuleList = this.moduleList.filter(x => x.SystemKey === this.currentMenu.permissionSystemId);
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

  addRootMenu() {
    this.doMenuAdd({ id: '' });
  }

  doMenuAdd(menu) {
    this.menuModalTitle = 'Create new menu';
    this.currentMenu = {
      authorizeType: 'public',
      icon: 'fa fa-list',
      parentId: menu.id,
      isActived: true,
      isNewkit1Page: false,
      sort: 0
    };
    this.isModalShown = true;
  }

  openIconSelectDialog() {
    this.isIconSelectModalShown = true;
  }

  selectIcon(icon: string) {
    this.currentMenu.icon = `fa fa-${icon}`;
    this.isIconSelectModalShown = false;
  }

  doMenuEdit(menu) {
    this.menuModalTitle = `Edit [${menu['en-us']}]`;
    this.currentMenu = _.cloneDeep(menu);
    if (authTypes.indexOf(this.currentMenu.authorizeType) < 0) {
      this.currentMenu.authorizeType = 'public';
    }
    this.isModalShown = true;
  }

  saveMenu() {
    if (this.currentMenu.id) { // Update
      this.negAjax.put(`${NewkitConf.NewkitAPI}/menu/${this.currentMenu.id}`, this.currentMenu, this.ajaxOpt)
        .then(res => {
          this.negAlert.success('Update menu successfully.');
          this.loadMenu();
          this.isModalShown = false;
        });
    } else { // Add
      this.negAjax.post(`${NewkitConf.NewkitAPI}/menu/new`, this.currentMenu, this.ajaxOpt)
        .then(res => {
          this.negAlert.success('Add menu successfully.');
          this.loadMenu();
          this.isModalShown = false;
        });
    }
  }

  doMenuDelete(menu) {
    this.negAlert.confirm('Sure to delete the menu?', () => {
      this.negAjax.delete(`${NewkitConf.NewkitAPI}/menu/${menu.id}`, this.ajaxOpt)
        .then(data => {
          this.loadMenu();
          this.negAlert.info('Delete menu successfully.');
        });
    }, null);
  }
}
