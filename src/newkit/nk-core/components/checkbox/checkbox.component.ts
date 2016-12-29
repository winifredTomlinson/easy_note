import { Component, OnInit, Input, Output, OnChanges, EventEmitter, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { ComponentBase } from './../ComponentBase';

export const CHECKBOX_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => CheckBoxComponent),
  multi: true
};

@Component({
  selector: 'nk-checkbox',
  templateUrl: 'checkbox.component.html',
  providers: [CHECKBOX_VALUE_ACCESSOR]
})
export class CheckBoxComponent extends ComponentBase implements ControlValueAccessor, OnInit, OnChanges {

  @Input()
  private label: string = '';

  private checked: boolean = false;
  public onChange: any = Function.prototype;
  public onTouched: any = Function.prototype;

  constructor() {
    super();
  }

  ngOnInit() {
    super.watch('checked', (newVal, oldValue) => {
      this.onChange(newVal);
    });
  }

  ngOnChanges(changesObj) {
  }

  public writeValue(value: any): void {
    this.checked = value;
  }

  public registerOnChange(fn: (_: any) => {}): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: () => {}): void {
    this.onTouched = fn;
  }
}