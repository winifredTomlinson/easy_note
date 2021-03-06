import { NgModule } from '@angular/core';

import { GridModule } from '@progress/kendo-angular-grid';
import { ChartsModule } from '@progress/kendo-angular-charts';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { LayoutModule } from '@progress/kendo-angular-layout';
import { DialogModule } from '@progress/kendo-angular-dialog';
import { UploadModule } from '@progress/kendo-angular-upload';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { PopupModule } from '@progress/kendo-angular-popup';
import { ScrollViewModule } from '@progress/kendo-angular-scrollview';
import { SortableModule } from '@progress/kendo-angular-sortable';

const KendoModules = [
  GridModule, ChartsModule, DropDownsModule, InputsModule,
  LayoutModule, DialogModule, UploadModule, ButtonsModule,
  PopupModule, ScrollViewModule, SortableModule
];

@NgModule({
  exports: [
    ...KendoModules
  ]
})
export class NkThirdPartyModule {
}
