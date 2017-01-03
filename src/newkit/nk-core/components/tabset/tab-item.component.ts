import { Component, OnInit, Input, AfterViewInit, ElementRef, Renderer } from '@angular/core';
import { ComponentBase } from './../ComponentBase';
import { TabsetComponent } from './tabset.component';

@Component({
  selector: 'nk-tab-item',
  template: `<ng-content></ng-content>`
})
export class TabItemComponent extends ComponentBase implements OnInit, AfterViewInit {

  public active: boolean = false;

  @Input()
  public tabName: string;

  @Input()
  public title: string;

  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer,
    private tabset: TabsetComponent
  ) {
    super();
  }

  ngOnInit() {
    this.renderer.setElementClass(this.elementRef.nativeElement, 'tab-pane', true);
    this.watch('active', (newVal, oldVal) => {
      this.renderer.setElementClass(this.elementRef.nativeElement, 'active', newVal);
    });
  }

  ngAfterViewInit() {
    this.tabset.tabItems.push(this);
    if (this.active) {
      this.renderer.setElementClass(this.elementRef.nativeElement, 'active', true);
      // $(this.elementRef.nativeElement).addClass('active');
    }
  }
}
