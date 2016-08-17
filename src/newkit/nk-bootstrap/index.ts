import { enableProdMode, provide, PLATFORM_DIRECTIVES } from '@angular/core';
import { APP_BASE_HREF, LocationStrategy, HashLocationStrategy, PathLocationStrategy, PlatformLocation } from '@angular/common';
import { BrowserPlatformLocation } from '@angular/platform-browser';
import { bootstrap } from '@angular/platform-browser-dynamic';
import { HTTP_PROVIDERS } from '@angular/http';
import { disableDeprecatedForms, provideForms } from '@angular/forms';
import { UIROUTER_PROVIDERS, UIRouterConfig, UIROUTER_DIRECTIVES } from 'ui-router-ng2';

import {NkUIRouterConfig} from './uiRouterConfig';
import {NegModuleLoader} from './../nk-core';
import {AppComponent} from './../nk-shell';


// enableProdMode();
bootstrap(AppComponent, [
  provide(APP_BASE_HREF, { useValue: '/' }),
  provide(LocationStrategy, { useClass: HashLocationStrategy }),
  provide(PlatformLocation, { useClass: BrowserPlatformLocation }),
  ...HTTP_PROVIDERS,
  ...UIROUTER_PROVIDERS,
  provide(UIRouterConfig, { useClass: NkUIRouterConfig }),
  provide(PLATFORM_DIRECTIVES, { useValue: UIROUTER_DIRECTIVES, multi: true }),
  NegModuleLoader,
  disableDeprecatedForms(),
  provideForms()
]);