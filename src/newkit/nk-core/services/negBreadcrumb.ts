import { Injectable } from '@angular/core';

import { NegEventBus } from './negEventBus';

@Injectable()
export class NegBreadcrumb {

  constructor(
    private negEventBus: NegEventBus
  ) { }

  setBreadcrumbs(breadcrumbs) {
    if(!_.isArray(breadcrumbs)){
      return;
    }
    this.negEventBus.emit('global.setBreadcrumbs', breadcrumbs);
  }

  setLastBreadcrumb(lastBreadcrumb) {
    this.negEventBus.emit('global.setLastBreadcrumb', lastBreadcrumb);
  }
}