import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LayoutComponent, Comp1Component, Comp2Component } from './components';

const appRoutes: Routes = [
  { path: '', component: LayoutComponent },
  { path: 'comp1', component: Comp1Component },
  { path: 'test', component: Comp2Component }
];

export const routing: ModuleWithProviders = RouterModule.forChild(appRoutes);