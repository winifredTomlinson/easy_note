import { Component, OnInit, Input, Output, ElementRef, AfterViewInit, OnChanges, EventEmitter } from '@angular/core';

@Component({
  selector: 'nk-progress',
  templateUrl: 'progress.component.html'
})
export class ProgressComponent implements OnInit, OnChanges, AfterViewInit {

  private classArr: Array<string> = [];
  private progressBarClass: string;
  private width: string;

  @Input()
  private size: string;

  @Input()
  private maxValue: number = 100;

  @Input()
  private isStriped: boolean;

  @Input()
  private type: string;

  @Input()
  private isActive: boolean;

  @Input('value')
  private set value(val: number) {
    let per = (val / this.maxValue * 100);
    if (_.isNaN(per)) {
      this.width = null;
      return;
    }
    if (per > 100) {
      per = 100;
    }
    this.width = `${per}%`;
  }

  ngOnInit() {

  }

  ngOnChanges(changesObj) {
    if (changesObj.size) {
      this.classArr[0] = this.size ? `progress-${this.size}` : '';
    }
    if (changesObj.isStriped) {
      this.classArr[1] = this.isStriped ? 'progress-striped' : '';
    }
    if (changesObj.type) {
      this.classArr[2] = this.type ? `progress-bar-${this.type}` : '';
    }
    if (changesObj.isActive) {
      this.classArr[3] = this.isActive ? `active` : '';
    }
    this.progressBarClass = this.classArr.join(' ');
  }

  ngAfterViewInit() {

  }
}