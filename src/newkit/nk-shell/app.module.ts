import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { CORE_SERVICES, CORE_PIPES, NkCoreModule } from './../nk-core';
import { routing } from './app.routing';

import { ALL_PAGES } from './app';
import { ALL_COMPONENTS } from './components';
import { AppComponent } from './app.component';

import { CrossDomainMessage } from './services';


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
    ...CORE_PIPES,
    CrossDomainMessage
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

}
