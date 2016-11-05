const config = {
  debug: true,
  version: '0.0.1',
  APIGatewayAddress: 'http://10.16.75.24:3000',
  configServiceAddress: 'http://10.16.75.24:3000/eggkeeper/v1',
  DomainName: 'Newkit',
  SSOAddress: 'http://10.16.75.26:8501',
  NewkitAPI: 'http://10.16.75.27:9031/newegg-central-2/v1',
  Applications: ['1f48a705-b734-476c-b32b-29359177c122'],
  modules: [
    { path: 'nk-template', module: 'nk-template' },
    { path: 'nk-common', module: 'nk-common' },
    { path: 'nk-test', module: 'nk-test' },
    { path: 'nk-demo', module: 'nk-demo' }
  ],
  menus: [
    {
      Icon: 'fa-list', text: 'Newkit2 Kendo Demo', SubMenus: [
        { Icon: 'fa-list', Url: '/nk-demo/buttons/button', text: 'Button' },
        { Icon: 'fa-list', Url: '/nk-demo/buttons/button-group', text: 'Button Group' },
        { Icon: 'fa-list', Url: '/nk-demo/charts/chart', text: 'Chart' },
        { Icon: 'fa-list', Url: '/nk-demo/dialogs/dialog', text: 'Dialog' },
        { Icon: 'fa-list', Url: '/nk-demo/dropdowns/dropdownlist', text: 'Dropdown List' },
        { Icon: 'fa-list', Url: '/nk-demo/dropdowns/combobox', text: 'Combobox' },
        { Icon: 'fa-list', Url: '/nk-demo/grids/grid', text: 'Grid' },
        { Icon: 'fa-list', Url: '/nk-demo/inputs/slider', text: 'Slider' },
        { Icon: 'fa-list', Url: '/nk-demo/inputs/switch', text: 'Switch' }
      ]
    }
  ]
};

window.NewkitConf = config;