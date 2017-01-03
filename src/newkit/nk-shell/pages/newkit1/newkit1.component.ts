import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { NegEventBus } from 'newkit/core';

@Component({
  template: ''
})
export class Newkit1Component implements OnInit {
  constructor(
    private router: Router,
    private negEventBus: NegEventBus
  ) { }

  ngOnInit() {
    let hash = window.location.hash.replace(/^#/, '');
    if (hash) {
      this.negEventBus.emit('nkShell.menuChanged', {
        isNg1: true,
        Url: hash
      });
    } else {
      // this.router.navigate(['/system/404']);
    }
  }
}