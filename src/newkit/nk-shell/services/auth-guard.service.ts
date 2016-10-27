import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { NegAuth } from 'newkit/core';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild, CanLoad {

  constructor(private negAuth: NegAuth) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    console.log(route, state);
    console.log('AuthGuard#canActivate called');
    if (this.negAuth.isAuthenticated()) {
      return Promise.resolve(true);
    } else {
      return Promise.resolve(false);
    }
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    console.log('AuthGuard#canActivateChild called')
    return this.canActivate(route, state);
  }

  canDeactivate(): boolean {
    console.log('AuthGuard#canDeactivate called');
    return true;
  }
  canLoad(): boolean {
    console.log('AuthGuard#canLoad called');
    return true;
  }
}