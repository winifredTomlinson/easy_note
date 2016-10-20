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
  LayoutComponent,
  Newkit1Component
} from './app';

const loadModule = (moduleName) => {
  return () => {
    // let moduleName = window.location.pathname.replace(/^\//, '').split('/')[0];
    return new Promise((resolve, reject) => {
      console.log(moduleName);
      SystemJS.import(`/dist/modules/${moduleName}/test.js`)
        .then(() => {
          SystemJS.import('app.module')
            .then(data => {
              console.log(data.AppModule)
              resolve(data.AppModule);
            });
        })
        .catch(err => {
          console.error(err);
          reject(err);
        });
    });
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
{ path: '', component: AboutComponent },
{ path: '**', component: NotFoundComponent }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes, { useHash: false });