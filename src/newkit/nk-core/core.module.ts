import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule, JsonpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { UIRouterModule } from 'ui-router-ng2';

@NgModule({
  imports: [
    CommonModule,
    HttpModule, JsonpModule,
    FormsModule,
    UIRouterModule
  ],
  declarations: [],
  exports: [
    CommonModule,
    HttpModule, JsonpModule,
    FormsModule,
    UIRouterModule
  ]
})
export class NkCoreModule {

}