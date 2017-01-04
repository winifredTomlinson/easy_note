require('./css/layout.styl');
require('./app.styl');
require('./components/menu/menu.styl');
require('./pages/menu-setting/menu.component.styl');

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app.module';

platformBrowserDynamic()
  .bootstrapModule(AppModule);
