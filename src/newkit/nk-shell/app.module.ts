import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import {
  NkCoreModule, TranslateModule,
  CORE_SERVICES, CORE_PIPES,
  NegModuleLoader, TranslateService
} from 'newkit/core';

import { ALL_PAGES } from './app';
import { ALL_COMPONENTS } from './components';
import { ALL_PIPES } from './pipes';
import { ALL_SERVICES } from './services';
import { routing } from './app.routing';
import { AppComponent } from './app.component';

@NgModule({
  imports: [
    BrowserModule,
    NkCoreModule,
    RouterModule,
    TranslateModule.forRoot(),
    routing
  ],
  declarations: [AppComponent, ...ALL_PAGES, ...ALL_COMPONENTS, ...ALL_PIPES],
  providers: [
    TranslateService,
    ...CORE_SERVICES,
    ...CORE_PIPES,
    ...ALL_SERVICES
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private negModuleLoader: NegModuleLoader) {

  }
}
