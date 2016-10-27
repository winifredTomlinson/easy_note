import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { NegAuth, NegUtil, NegStorage, NegEventBus } from 'newkit/core';
import { AuthService } from './';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild, CanLoad {

  private isFirstRoute: boolean = true;

  constructor(
    private negAuth: NegAuth,
    private negUtil: NegUtil,
    private negStorage: NegStorage,
    private negEventBus: NegEventBus,
    private authService: AuthService
  ) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    if (this.isFirstRoute) {
      this.isFirstRoute = false;
      return new Promise(resolve => {
        this._doLogin()
          .then(() => {
            this.negEventBus.emit('global.loginSucceed');
          })
          .catch(reason => {
            let errorCount = (this.negStorage.local.get('login-error-count') || 0) + 1;
            if (errorCount > 3) {
              return console.log('login failed:', reason);
            }
            let ssoLoginUrl = `${NewkitConf.SSOAddress}/login?redirect_url=${window.location.href}`;
            window.location.href = ssoLoginUrl;
          });
      });
    }
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

  _doLogin(): Promise<any> {
    let p: Promise<any>; // Auth Promise
    // If redirect by sso
    let ssoToken = this.negUtil.getQuery('t');
    if (ssoToken) {
      p = this.authService.login(ssoToken);
    } else {
      let token = this.negStorage.local.get('x-newkit-token');
      // No token
      if (!token) {
        return Promise.reject(false);
      }
      // Auto login
      p = this.authService.autoLogin(token);
    }
    // Process result
    return p;
  }
}