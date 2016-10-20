import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Page1Component } from './app/page1/page1.component';

const appRoutes: Routes = [
  { path: 'page1', component: Page1Component },
];

export const routing: ModuleWithProviders = RouterModule.forChild(appRoutes);