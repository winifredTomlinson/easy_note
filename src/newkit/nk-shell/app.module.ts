import { NgModule, NgModuleFactoryLoader } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, RouterOutlet } from '@angular/router';

import { CORE_SERVICES, CORE_PIPES, NkCoreModule } from './../nk-core';
import { routing } from './app.routing';

import { ALL_PAGES } from './app';
import { ALL_COMPONENTS } from './components';
import { AppComponent } from './app.component';


@NgModule({
  imports: [
    BrowserModule,
    NkCoreModule,
    RouterModule,
    routing
  ],
  declarations: [AppComponent, ...ALL_PAGES, ...ALL_COMPONENTS],
  providers: [
    ...CORE_SERVICES,
    ...CORE_PIPES
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

}
