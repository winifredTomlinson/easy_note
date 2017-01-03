import { Component, OnInit, Input, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { TabItemComponent } from './tab-item.component';

@Component({
  selector: 'nk-tabset',
  templateUrl: 'tabset.component.html'
})
export class TabsetComponent implements OnInit, AfterViewInit {
  public tabItems: TabItemComponent[] = [];

  @Input()
  private set selectIndex(val) {
    this._selectIndex = val;
    this.selectIndexChange.emit(this._selectIndex);
    this.setActiveItem(this._selectIndex);
  }

  @Output()
  private selectIndexChange = new EventEmitter();

  constructor() { }

  ngOnInit() { }

  ngAfterViewInit() {
    this.setActiveItem(this._selectIndex);
  }

  setActiveItem(tabItem: TabItemComponent | number) {
    let isIndex = typeof tabItem === 'number';
    this.tabItems.forEach((item: TabItemComponent, idx: number) => {
      item.active = isIndex ? (tabItem === idx) : (tabItem === item);
      if(!isIndex && tabItem === item){
        this.selectIndexChange.emit(idx);
      }
    });
  }
}
