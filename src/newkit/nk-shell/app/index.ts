import { HomeComponent } from './home/home.component';
export * from './home/home.component';

import { AboutComponent } from './about/about.component';
export * from './about/about.component';

import { NotFoundComponent } from './404/notfound.component';
export * from './404/notfound.component';

import { ServicesTestComponent } from './test/test.component';
export * from './test/test.component';

import { MenuSettingComponent } from './menu-setting/menu-setting.component';
export * from './menu-setting/menu-setting.component';

import { GlobalConfigurationComponent } from './global-configuration/global-configuration.component';
export * from './global-configuration/global-configuration.component';

import { GlobalSearchComponent } from './global-search/global-search.component';
export * from './global-search/global-search.component';

import { DeployComponent } from './deploy/deploy.component';
export * from './deploy/deploy.component';

import { LayoutComponent } from './layout/layout.component';
export * from './layout/layout.component';

export const ALL_PAGES = [
  HomeComponent,
  NotFoundComponent,
  ServicesTestComponent,
  MenuSettingComponent,
  GlobalConfigurationComponent,
  GlobalSearchComponent,
  DeployComponent,
  LayoutComponent,
  AboutComponent
];