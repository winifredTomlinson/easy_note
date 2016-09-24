import { Ng2StateDeclaration } from 'ui-router-ng2';

import {
  HomeComponent,
  MenuSettingComponent,
  GlobalConfigurationComponent,
  GlobalSearchComponent,
  DeployComponent,
  NotFoundComponent,
  ServicesTestComponent,
  AboutComponent,
  LayoutComponent
} from './app';

export let APP_STATES: Ng2StateDeclaration[] = [
  { name: 'nkShell', component: LayoutComponent, url: '/system' },
  { name: 'nkShell.menuSetting', component: MenuSettingComponent, url: '/menu-setting' },
  { name: 'nkShell.globalConfiguration', component: GlobalConfigurationComponent, url: '/global-configuration' },
  { name: 'nkShell.globalSearch', component: GlobalSearchComponent, url: '/global-search' },
  { name: 'nkShell.deploy', component: DeployComponent, url: '/deploy' },
  { name: 'nkShell.404', component: NotFoundComponent, url: '/404' },
  { name: 'nkShell.home', component: ServicesTestComponent, url: '/home' },
  { name: 'nkShell.about', component: AboutComponent, url: '/about' }
];