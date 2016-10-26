import { NgModule } from '@angular/core';
import { NkCoreModule } from 'newkit/core';

import { routing } from './app.routing';
import { Page1Component }   from './app/page1/page1.component';

@NgModule({
  imports: [
    NkCoreModule,
    routing
  ],
  exports: [],
  declarations: [Page1Component],
  providers: [],
})
export class AppModule { }
