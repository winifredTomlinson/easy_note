import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Page1Component } from './pages';

const appRoutes: Routes = [
  { path: '', component: Page1Component }
];

export const routing: ModuleWithProviders = RouterModule.forChild(appRoutes);