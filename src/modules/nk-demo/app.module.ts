import { NgModule } from '@angular/core';
import { NkCoreModule } from 'newkit/core';

import { routing } from './app.routing';
import { ALL_COMPONENTS } from './app';

@NgModule({
  imports: [
    NkCoreModule,
    routing
  ],
  exports: [],
  declarations: [...ALL_COMPONENTS],
  providers: [],
})
export class AppModule {

}
