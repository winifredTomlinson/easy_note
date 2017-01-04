import { Component, OnInit } from '@angular/core';

@Component({
  template: require('./chart.component.html')
})
export class ChartComponent implements OnInit {

  private chartSeries: any[] = [{ data: [1, 2, 3, 5] }];
  private chartTitle: any = { text: 'Sample Chart' };

  private showSeries: boolean = false;
  private showTransitions: boolean = true;

  private seriesData: number[] = [1, 2, 3, 5];

  private model = [];

  constructor() { }

  ngOnInit() { }

  private toggleSeries() {
    this.showSeries = !this.showSeries;
    this.showTransitions = false;
  }

  private addSeries() {
    this.model.push({
      name: `Series #${this.model.length + 1}`,
      data: [Math.random(), Math.random(), Math.random()]
    });
  }

  private onSeriesClick(e): void {
    console.log(e.value);
  }
}