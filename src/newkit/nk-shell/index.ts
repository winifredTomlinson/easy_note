import '!style!css!./css/layout.css';

import { LayoutComponent } from './layout.component';
import { HomeComponent } from './app/home/home.component';
import { AboutComponent } from './app/about/about.component';
import { NotFoundComponent } from './app/404/notfound.component';
import { ServicesTestComponent } from './app/test/test.component';

export { AppComponent } from './app.component';

export let MODULE_STATES = [
  { name: 'nkShell', component: LayoutComponent, url: '/system' },
  { name: 'nkShell.404', component: NotFoundComponent, url: '/404' },
  { name: 'nkShell.home', component: ServicesTestComponent, url: '/home' },
  { name: 'nkShell.about', component: AboutComponent, url: '/about' }
];