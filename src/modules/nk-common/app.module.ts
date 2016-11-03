import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { routing } from './app.routing';
import { ALL_PAGES } from './app';


@NgModule({
  imports: [
    RouterModule,
    routing
  ],
  declarations: [...ALL_PAGES],
  providers: [
  ]
})
export class AppModule {

}
