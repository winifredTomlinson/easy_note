import '!style!css!./css/layout.css';

import { LayoutComponent } from './layout.component';
import { HomeComponent } from './app/home/home.component';
import { AboutComponent } from './app/about/about.component';
import { NotFoundComponent } from './app/404/notfound.component';
import { ServicesTestComponent } from './app/test/test.component';
import { MenuSettingComponent } from './app/menu-setting/menu-setting.component';
import { GlobalConfigurationComponent } from './app/global-configuration/global-configuration.component';
import { GlobalSearchComponent } from './app/global-search/global-search.component';
import { DeployComponent } from './app/deploy/deploy.component';

export { AppComponent } from './app.component';

export let MODULE_STATES = [
  { name: 'nkShell', component: LayoutComponent, url: '/system' },
  { name: 'nkShell.menuSetting', component: MenuSettingComponent, url: '/menu-setting' },
  { name: 'nkShell.globalConfiguration', component: GlobalConfigurationComponent, url: '/global-configuration' },
  { name: 'nkShell.globalSearch', component: GlobalSearchComponent, url: '/global-search' },
  { name: 'nkShell.deploy', component: DeployComponent, url: '/deploy' },
  { name: 'nkShell.404', component: NotFoundComponent, url: '/404' },
  { name: 'nkShell.home', component: ServicesTestComponent, url: '/home' },
  { name: 'nkShell.about', component: AboutComponent, url: '/about' }
];