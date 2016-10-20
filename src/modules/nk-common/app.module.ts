import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { ALL_COMPONENTS } from './components';
import { routing } from './app.routing';

@NgModule({
  imports: [
    RouterModule,
    routing
  ],
  declarations: [...ALL_COMPONENTS],
  providers: [
  ]
})
export class AppModule {

}
