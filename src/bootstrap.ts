import {Component, provide, enableProdMode, PLATFORM_DIRECTIVES} from "@angular/core";
import {APP_BASE_HREF, LocationStrategy, PathLocationStrategy, HashLocationStrategy, PlatformLocation} from '@angular/common';
import {bootstrap} from '@angular/platform-browser-dynamic';
import {BrowserPlatformLocation} from '@angular/platform-browser';
import {UIRouterConfig, UIROUTER_PROVIDERS, UIROUTER_DIRECTIVES} from 'ui-router-ng2';

import {NkUIRouterConfig} from './uiRouterConfig';
import {AppComponent} from './modules/nk-shell/components/app/app.component';


// enableProdMode();
bootstrap(AppComponent, [
  provide(APP_BASE_HREF, { useValue: '/' }),
  provide(LocationStrategy, { useClass: PathLocationStrategy }),
  provide(PlatformLocation, { useClass: BrowserPlatformLocation }),
  ...UIROUTER_PROVIDERS,
  provide(UIRouterConfig, { useClass: NkUIRouterConfig }),
  provide(PLATFORM_DIRECTIVES, { useValue: [UIROUTER_DIRECTIVES], multi: true })
]);