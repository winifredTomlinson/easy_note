((ng, app) => {
  'use strict';

  let ROUTER_DIRECTIVES = ng.router.ROUTER_DIRECTIVES;
  let Router = ng.router.Router;
  let DynamicComponentLoader = ng.core.DynamicComponentLoader;

  class MenuComponent {
    constructor(router, dynamicComponentLoader, viewContainerRef, injector) {
      this.dynamicComponentLoader = dynamicComponentLoader;
      this.router = router;
      this.viewContainerRef = viewContainerRef;
      this.injector = injector;
      console.log('menu init');
      this.initMenuData();
    }

    menuCollapse(menu, evt) {
      menu.open = !menu.open;
      if (evt) {
        evt.preventDefault();
        evt.stopPropagation();
      }
    }

    menuClick(menu) {
      if (menu.children && menu.children.length > 0) {
        return this.menuCollapse(menu);
      }
      let url = menu.url;
      if (url) {
        menu.active = true;
        this.router.navigate([url]);
      }
    }

    initMenuData() {
      this.menuData = [{
        icon: 'fa fa-home',
        name: 'Home',
        // url: '/home',
        children: [{
          icon: 'fa fa-lock',
          name: 'AAAA',
          // url: '/',
          children: [{
            icon: 'fa fa-file',
            name: '第三级菜单，很长很长很长很长很长很长很长',
            // url: '/',
            children: [{
              icon: 'fa fa-file',
              name: '第四级菜单很长很长很长很长行阿萨德发送发到发发到',
              url: '/home',
              active: true
            }]
          }]
        }]
      }, {
          icon: 'fa fa-link',
          name: 'About',
          url: '/about',
          children: []
        }];
    }
  }

  MenuComponent.parameters = [
    Router,
    DynamicComponentLoader,
    ng.core.ViewContainerRef,
    ng.core.Injector
  ];

  MenuComponent.annotations = [
    new ng.core.Component({
      selector: 'nk-menu',
      templateUrl: '/src/core/components/app/menu.html',
      directives: [ROUTER_DIRECTIVES]
    })
  ];

  app.MenuComponent = MenuComponent;
  window.NewkitApp = app;
})(window.ng, window.NewkitApp || {});