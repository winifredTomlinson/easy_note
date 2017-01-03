import { Component, OnInit, Input, Output, ElementRef, AfterViewInit, OnChanges, EventEmitter } from '@angular/core';
import { AccordionComponent } from './accordion.component';

@Component({
  selector: 'nk-accordion-item',
  templateUrl: 'accordion-item.component.html'
})
export class AccordionItemComponent implements OnInit, AfterViewInit {

  private accordionItemId: string = `accordion_item_${Math.random().toString(16).slice(2)}`;

  @Input()
  private title: string;

  @Input()
  private isActive: boolean;

  constructor(public accordion: AccordionComponent) {
  }

  ngOnInit() {

  }

  ngAfterViewInit() {

  }
}
