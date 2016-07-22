import {LayoutComponent} from './components/layout/layout.component';
import {Comp1Component} from './components/comp1/comp1.component';

export let MODULE_STATES: Array<any> = [
  { name: 'nkCommon', component: LayoutComponent, url: '/nk-common' },
  { name: 'nkCommon.comp1', component: Comp1Component, url: '/comp1' }
];