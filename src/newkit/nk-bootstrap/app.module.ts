import { NgModule, provide, PLATFORM_DIRECTIVES } from '@angular/core';
import { APP_BASE_HREF, LocationStrategy, HashLocationStrategy, PathLocationStrategy, PlatformLocation } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HTTP_PROVIDERS } from '@angular/http';
import { UIROUTER_PROVIDERS, UIRouterConfig, UIROUTER_DIRECTIVES } from 'ui-router-ng2';

import { NkUIRouterConfig } from './uiRouterConfig';
import { NegModuleLoader } from './../nk-core';
import { AppComponent } from './../nk-shell';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule
  ], // 导出当前模块的素材
  declarations: [
    AppComponent
  ], // 属于当前模板的组件和指令
  providers: [
    provide(LocationStrategy, { useClass: HashLocationStrategy }),
    ...HTTP_PROVIDERS,
    ...UIROUTER_PROVIDERS,
    provide(UIRouterConfig, { useClass: NkUIRouterConfig }),
    provide(PLATFORM_DIRECTIVES, { useValue: UIROUTER_DIRECTIVES, multi: true }),
    NegModuleLoader
  ],
  bootstrap: [AppComponent] // 标记根组件
})
export class AppModule {

}