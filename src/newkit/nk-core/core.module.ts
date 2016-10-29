import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule, JsonpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from 'ng2-translate';

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

import {
  AccordionModule, AutoCompleteModule, BlockUIModule, BreadcrumbModule, ButtonModule, CalendarModule,
  CarouselModule, ChartModule, CheckboxModule, CodeHighlighterModule, ConfirmDialogModule, ContextMenuModule,
  DataGridModule, DataListModule, DataScrollerModule, DataTableModule, DialogModule as PrimengDialogModule,
  DragDropModule, EditorModule, FieldsetModule, GalleriaModule, GMapModule, GrowlModule, InplaceModule, InputMaskModule,
  InputSwitchModule, InputTextModule, InputTextareaModule, LightboxModule, ListboxModule, MegaMenuModule,
  MenuModule, MenubarModule, MessagesModule, MultiSelectModule, OrderListModule, OverlayPanelModule,
  PaginatorModule, PanelModule, PanelMenuModule, PasswordModule, PickListModule, ProgressBarModule, RadioButtonModule,
  RatingModule, ScheduleModule, SelectButtonModule, SliderModule, SlideMenuModule, SpinnerModule, SplitButtonModule,
  StepsModule, TabMenuModule, TabViewModule, TerminalModule, TieredMenuModule, ToggleButtonModule, ToolbarModule, TooltipModule,
  TreeModule, TreeTableModule, TriStateCheckboxModule
} from 'primeng/primeng';

const KendoModules = [
  GridModule, ChartsModule, DropDownsModule, InputsModule,
  LayoutModule, DialogModule, UploadModule, ButtonsModule,
  PopupModule, ScrollViewModule, SortableModule
];

const PrimengModules = [
  AccordionModule, AutoCompleteModule, BlockUIModule, BreadcrumbModule, ButtonModule, CalendarModule,
  CarouselModule, ChartModule, CheckboxModule, CodeHighlighterModule, ConfirmDialogModule, ContextMenuModule,
  DataGridModule, DataListModule, DataScrollerModule, DataTableModule, PrimengDialogModule,
  DragDropModule, EditorModule, FieldsetModule, GalleriaModule, GMapModule, GrowlModule, InplaceModule, InputMaskModule,
  InputSwitchModule, InputTextModule, InputTextareaModule, LightboxModule, ListboxModule, MegaMenuModule,
  MenuModule, MenubarModule, MessagesModule, MultiSelectModule, OrderListModule, OverlayPanelModule,
  PaginatorModule, PanelModule, PanelMenuModule, PasswordModule, PickListModule, ProgressBarModule, RadioButtonModule,
  RatingModule, ScheduleModule, SelectButtonModule, SliderModule, SlideMenuModule, SpinnerModule, SplitButtonModule,
  StepsModule, TabMenuModule, TabViewModule, TerminalModule, TieredMenuModule, ToggleButtonModule, ToolbarModule, TooltipModule,
  TreeModule, TreeTableModule, TriStateCheckboxModule
];

@NgModule({
  imports: [
    CommonModule,
    HttpModule, JsonpModule,
    FormsModule,
  ],
  declarations: [],
  exports: [
    CommonModule,
    HttpModule, JsonpModule,
    FormsModule,
    TranslateModule,
    ...KendoModules,
    ...PrimengModules
  ]
})
export class NkCoreModule {

}