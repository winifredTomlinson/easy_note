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

const loadModule = () => {
  return new Promise((resolve, reject) => {
    SystemJS.import('/dist/modules/nk-common/app.js')
      .then(() => {
        SystemJS.import('app.module')
          .then(data => {
            console.log(data.AppModule)
            resolve(data.AppModule);
          });
      })
      .catch(err => console.error(err));
  });
}

const appRoutes: Routes = [{
  path: 'system', component: LayoutComponent, children: [
    { path: 'menu-setting', component: MenuSettingComponent },
    { path: 'global-configuration', component: GlobalConfigurationComponent },
    { path: 'global-search', component: GlobalSearchComponent },
    { path: 'deploy', component: DeployComponent },
    { path: 'home', component: ServicesTestComponent },
    { path: 'about', component: AboutComponent }
  ],
}, {
  path: 'nk-common', loadChildren: loadModule
}, {
  path: '', component: AboutComponent
}, {
  path: '**', component: NotFoundComponent
}];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes, { useHash: true });