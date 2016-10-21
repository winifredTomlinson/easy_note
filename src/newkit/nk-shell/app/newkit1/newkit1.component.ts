import { Component, OnInit } from '@angular/core';

import { NegEventBus } from './../../../nk-core';

@Component({
  template: ''
})
export class Newkit1Component implements OnInit {
  constructor(
    private negEventBus: NegEventBus
  ) { }

  ngOnInit() {
    let hash = window.location.hash.replace(/^#/, '');
    if (hash) {
      this.negEventBus.emit('nkShell.menuChanged', {
        isNg1: true,
        url: hash
      });
    }
  }
}