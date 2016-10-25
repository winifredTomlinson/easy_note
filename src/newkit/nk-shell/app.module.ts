import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { TranslateModule } from 'ng2-translate';

import { CORE_SERVICES, CORE_PIPES, NkCoreModule, NegModuleLoader } from 'newkit/core';
import { routing } from './app.routing';

import { ALL_PAGES } from './app';
import { ALL_COMPONENTS } from './components';
import { AppComponent } from './app.component';

import { CrossDomainMessage, AuthService, MenuService, MessageProcessor } from './services';


@NgModule({
  imports: [
    BrowserModule,
    NkCoreModule,
    RouterModule,
    TranslateModule.forRoot(),
    routing
  ],
  declarations: [AppComponent, ...ALL_PAGES, ...ALL_COMPONENTS],
  providers: [
    ...CORE_SERVICES,
    ...CORE_PIPES,
    CrossDomainMessage,
    AuthService,
    MenuService,
    MessageProcessor
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(private negModuleLoader: NegModuleLoader) {

  }
}
