import { NgModule } from '@angular/core';
import { NkCoreModule } from 'newkit/core';

import { routing } from './app.routing';
import { ALL_COMPONENTS } from './pages';

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
