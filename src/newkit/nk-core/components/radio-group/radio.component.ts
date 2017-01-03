import { Component, OnInit, Input, Output, OnChanges, EventEmitter, forwardRef, Renderer, ElementRef } from '@angular/core';
import { ComponentBase } from './../ComponentBase';
import { RadioGroupComponent } from './radio-group.component';

@Component({
  selector: 'nk-radio',
  templateUrl: 'radio.component.html'
})
export class RadioComponent extends ComponentBase implements OnInit, OnChanges {

  @Input()
  private label: string = '';

  @Input()
  public value: any;

  public checked: boolean = false;

  constructor(
    private radioGroup: RadioGroupComponent,
    private renderer: Renderer,
    private elementRef: ElementRef) {
    super();
  }

  ngOnInit() {
    let inputEl = this.elementRef.nativeElement.querySelector('input');
    this.renderer.setElementAttribute(inputEl, 'name', this.radioGroup.name);
    this.radioGroup.radios.push(this);
  }

  ngOnChanges(changesObj) {
    if (changesObj.value && this.value === undefined) {
      this.value = true;
    }
  }

  radioChecked() {
    this.radioGroup.setNgModel(this.value);
  }
}
