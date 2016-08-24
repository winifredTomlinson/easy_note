import { Injectable } from '@angular/core';

@Injectable()
export class NegProgress {

  constructor() { }

  start() {
    NProgress.start();
  }

  done() {
    NProgress.done();
  }
}