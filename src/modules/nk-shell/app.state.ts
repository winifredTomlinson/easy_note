import '!style!css!./css/layout.css';

import {LayoutComponent} from './components/layout/layout.component';
import {HomeComponent} from './components/home/home.component';
import {AboutComponent} from './components/about/about.component';


export let NkShellStates = [
  { name: 'nkShell', component: LayoutComponent, url: '/system' },
  { name: 'nkShell.home', component: HomeComponent, url: '/home' },
  { name: 'nkShell.about', component: AboutComponent, url: '/about' }
];