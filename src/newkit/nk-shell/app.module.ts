import '!style!css!./css/layout.css';

import { NgModule, NgModuleFactoryLoader } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { UIRouterModule, trace, Category, UIView } from 'ui-router-ng2';

import { NkUIRouterConfig } from './router.config';
import { CORE_SERVICES, CORE_PIPES, NkCoreModule } from './../nk-core';


import { ALL_PAGES } from './app';
import { ALL_COMPONENTS } from './components';
import { APP_STATES } from './app.state';
import { AppComponent } from './app.component';

trace.enable(Category.TRANSITION, Category.VIEWCONFIG);

@NgModule({
  imports: [
    BrowserModule,
    NkCoreModule, 
    UIRouterModule.forRoot({
      states: APP_STATES,
      useHash: true,
      configClass: NkUIRouterConfig
    }),
  ],
  declarations: [AppComponent, ...ALL_PAGES, ...ALL_COMPONENTS],
  providers: [
    ...CORE_SERVICES,
    ...CORE_PIPES
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule {

}
