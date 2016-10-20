import { NgModule } from '@angular/core';

import { routing } from './app.routing';
import { Page1Component }   from './app/page1/page1.component';

@NgModule({
  imports: [
    routing
  ],
  exports: [],
  declarations: [Page1Component],
  providers: [],
})
export class AppModule { }
