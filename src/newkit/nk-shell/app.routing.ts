import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

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

const appRoutes: Routes = [{
  path: 'system', component: LayoutComponent, children: [
    { path: 'menu-setting', component: MenuSettingComponent },
    { path: 'global-configuration', component: GlobalConfigurationComponent },
    { path: 'global-search', component: GlobalSearchComponent },
    { path: 'deploy', component: DeployComponent },
    { path: 'home', component: ServicesTestComponent },
    { path: 'about', component: AboutComponent },
  ],
}, {
  path: '', component: AboutComponent
}, {
  path: '**', component: NotFoundComponent
}];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes, { useHash: true });