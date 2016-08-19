import {Component, Inject} from '@angular/core';

import {CrossDomainMessage} from './../../services/crossDomainMessage';

@Component({
  selector: 'nk-about',
  template: require('./about.html')
})
export class AboutComponent {
  private aaaa: string;
  constructor(
    @Inject(CrossDomainMessage) private crossDomainMessage: CrossDomainMessage
  ) {
    this.aaaa = 'abc';
  }
  postMsg() {
    this.crossDomainMessage.emit('test', 'good');
  }
}