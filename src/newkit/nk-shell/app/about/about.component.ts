import { Component, Inject } from '@angular/core';

import { CrossDomainMessage } from './../../services';

@Component({
  selector: 'nk-about',
  templateUrl: './about.html'
})
export class AboutComponent {
  private aaaa: string;
  constructor(private crossDomainMessage: CrossDomainMessage) {
    this.aaaa = 'abc';
  }

  postMsg() {
    this.crossDomainMessage.emit('test', 'good');
  }
}