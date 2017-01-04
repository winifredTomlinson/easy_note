import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  template: require('./dialog.component.html')
})
export class DialogComponent implements OnInit {

  private showDialog1: boolean = false;
  private showDialog2: boolean = false;
  private showDialog3: boolean = false;
  private showDialog4: boolean = false;
  private showDialog5: boolean = false;

  private intervalId: any;

  constructor() { }

  ngOnInit() {
    this.intervalId = setInterval(() => {
      this.onDialogClose();
    }, 5000);
  }

  ngOnDestroy() {
    window.clearInterval(this.intervalId);
  }

  private onDialogClose() {
    this.showDialog1 = false;
    this.showDialog2 = false;
    this.showDialog3 = false;
    this.showDialog4 = false;
    this.showDialog5 = false;
  }

  private onDialogAccept() {
    alert('ok');
    this.showDialog5 = false;
  }

  private onDeleteData() {
    alert('delete');
    this.showDialog4 = false;
  }
}