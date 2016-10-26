import { ModuleWithProviders, ApplicationRef } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Http, ConnectionBackend } from '@angular/http';

import { AuthService } from './services/authService';

import { NegModuleLoader } from 'newkit/core';

import {
  HomeComponent,
  MenuSettingComponent,
  GlobalConfigurationComponent,
  GlobalSearchComponent,
  DeployComponent,
  NotFoundComponent,
  ServicesTestComponent,
  AboutComponent,
  LayoutComponent,
  Newkit1Component
} from './app';

const loadModule = (moduleName) => {
  return () => {
    // let moduleName = window.location.pathname.replace(/^\//, '').split('/')[0];
    return NegModuleLoader.load(moduleName);
  }
};

const appRoutes: Routes = [{
  path: 'system', component: LayoutComponent, children: [
    { path: 'menu-setting', component: MenuSettingComponent },
    { path: 'global-configuration', component: GlobalConfigurationComponent },
    { path: 'global-search', component: GlobalSearchComponent },
    { path: 'deploy', component: DeployComponent },
    { path: 'home', component: ServicesTestComponent },
    { path: 'about', component: AboutComponent },
    { path: 'newkit1', component: Newkit1Component }
  ],
},
{ path: 'nk-common', loadChildren: loadModule('nk-common') },
{ path: 'nk-test', loadChildren: loadModule('nk-test') },
{ path: 'nk-demo', loadChildren: loadModule('nk-demo') },
{ path: '', component: AboutComponent, canActivate: [AuthService] },
{ path: '**', component: NotFoundComponent }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes, { useHash: false });