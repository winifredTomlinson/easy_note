import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {
  ButtonComponent,
  ButtonGroupComponent
} from './app';

const appRoutes: Routes = [
  { path: 'buttons/button', component: ButtonComponent },
  { path: 'buttons/button-group', component: ButtonGroupComponent },
];

export const routing: ModuleWithProviders = RouterModule.forChild(appRoutes);