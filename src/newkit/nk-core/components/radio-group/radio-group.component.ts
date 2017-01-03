import { Component, OnInit, Input, Output, OnChanges, EventEmitter, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ComponentBase } from './../ComponentBase';
import { RadioComponent } from './radio.component';

export const RADIO_GROUP_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => RadioGroupComponent),
  multi: true
};

@Component({
  selector: 'nk-radio-group',
  template: `<ng-content></ng-content>`,
  providers: [RADIO_GROUP_VALUE_ACCESSOR]
})
export class RadioGroupComponent extends ComponentBase implements ControlValueAccessor, OnInit {

  @Input()
  public inline: boolean;

  @Input()
  public name: string;

  public onChange: any = Function.prototype;
  public onTouched: any = Function.prototype;
  public radios: Array<RadioComponent> = [];

  constructor() {
    super();
  }

  ngOnInit() {
  }

  public writeValue(value: any): void {
    this.notifyRadio(value);
  }

  public registerOnChange(fn: (_: any) => {}): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: () => {}): void {
    this.onTouched = fn;
  }

  private notifyRadio(value) {
    this.radios.forEach(x => x.checked = value === x.value);
  }

  public setNgModel(value) {
    this.onChange(value);
    this.notifyRadio(value);
  }
}
