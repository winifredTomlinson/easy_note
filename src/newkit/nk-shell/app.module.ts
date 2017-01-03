import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import {
  NkCoreModule, TranslateModule,
  CORE_SERVICES, CORE_PIPES,
  NegModuleLoader, TranslateService, TranslateLoader
} from 'newkit/core';

import { ALL_PAGES } from './pages';
import { ALL_COMPONENTS } from './components';
import { ALL_PIPES } from './pipes';
import { ALL_SERVICES } from './services';
import { routing } from './app.routing';
import { AppComponent } from './app.component';

class EmptyTranslateLoader implements TranslateLoader {
  getTranslation(lang: string): Observable<any> {
    return Observable.of({});
  }
}

@NgModule({
  imports: [
    BrowserModule,
    NkCoreModule,
    RouterModule,
    TranslateModule.forRoot({
      provide: TranslateLoader,
      useClass: EmptyTranslateLoader
    }),
    routing
  ],
  declarations: [AppComponent, ...ALL_PAGES, ...ALL_COMPONENTS, ...ALL_PIPES],
  providers: [
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
