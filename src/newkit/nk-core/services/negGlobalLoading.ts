import {Injectable} from '@angular/core';

@Injectable()
export class NegGlobalLoading {
  private loadingEl: HTMLDivElement;
  constructor() {
    this._init();
  }

  _init() {
    this.loadingEl = <HTMLDivElement>document.querySelector('#preloader');
  }

  show(text?: string) {
    this.loadingEl.style.display = 'block';
    this.loadingEl.querySelector('p').innerHTML = text || 'Loading...';
  }

  hide() {
    this.loadingEl.style.display = 'none';
  }
};