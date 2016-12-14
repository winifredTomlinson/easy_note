import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule, JsonpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { ALL_COMPONENTS } from './components';

import { NkThirdPartyModule } from './third-party.module';


@NgModule({
  imports: [
    CommonModule,
    HttpModule, JsonpModule,
    FormsModule,
  ],
  declarations: [...ALL_COMPONENTS],
  exports: [
    CommonModule,
    HttpModule, JsonpModule,
    FormsModule,
    NkThirdPartyModule,
    ...ALL_COMPONENTS
  ]
})
export class NkCoreModule {
}