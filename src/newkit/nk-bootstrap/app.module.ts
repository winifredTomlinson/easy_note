import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NkUIRouterConfig } from './uiRouterConfig';

import { AppComponent } from './../nk-shell';

@NgModule({
  imports: [
    BrowserModule,
    // NkUIRouterConfig
  ], // 导出当前模块的素材
  declarations: [AppComponent], // 属于当前模板的组件和指令
  bootstrap: [AppComponent] // 标记根组件
})
export class AppModule {

}