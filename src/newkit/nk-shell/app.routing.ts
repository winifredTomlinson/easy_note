import { ModuleWithProviders, ApplicationRef } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Http, ConnectionBackend } from '@angular/http';

import { AuthService, AuthGuard } from './services';

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

let modules = {

};

let dynamicRoutes = [];

NewkitConf.modules.forEach(item => {
  dynamicRoutes.push({
    path: item.path,
    loadChildren: loadModule(item.module),
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard]
  });
});

const appRoutes: Routes = [{
  path: 'system', component: LayoutComponent, canActivate: [AuthGuard], canActivateChild: [AuthGuard],
  children: [
    { path: 'menu', component: MenuSettingComponent },
    { path: 'global-configuration', component: GlobalConfigurationComponent },
    { path: 'global-search', component: GlobalSearchComponent },
    { path: 'deploy', component: DeployComponent },
    { path: 'home', component: ServicesTestComponent },
    { path: 'about', component: AboutComponent },
    { path: 'newkit1', component: Newkit1Component },
    { path: '404', component: NotFoundComponent }
  ]
},
...dynamicRoutes,
{
  path: '', component: LayoutComponent, canActivate: [AuthGuard], canActivateChild: [AuthGuard],
  children: [
    { path: '', component: AboutComponent }
  ]
},
// { path: '**', redirectTo: '/system/404', canActivate: [AuthGuard] },
{ path: '**', component: NotFoundComponent }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes, { useHash: false });