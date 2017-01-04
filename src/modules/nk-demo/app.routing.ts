import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {
  ButtonComponent,
  ButtonGroupComponent,
  ChartComponent,
  DialogComponent,
  DropdownListComponent,
  ComboBoxComponent,
  GridComponent,
  SliderComponent,
  SwitchComponent
} from './pages';

const appRoutes: Routes = [
  { path: 'buttons/button', component: ButtonComponent },
  { path: 'buttons/button-group', component: ButtonGroupComponent },
  { path: 'charts/chart', component: ChartComponent },
  { path: 'dialogs/dialog', component: DialogComponent },
  { path: 'dropdowns/dropdownlist', component: DropdownListComponent },
  { path: 'dropdowns/combobox', component: ComboBoxComponent },
  { path: 'grids/grid', component: GridComponent },
  { path: 'inputs/slider', component: SliderComponent },
  { path: 'inputs/switch', component: SwitchComponent }
];

export const routing: ModuleWithProviders = RouterModule.forChild(appRoutes);