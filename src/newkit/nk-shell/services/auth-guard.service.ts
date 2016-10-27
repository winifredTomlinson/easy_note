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
    let url: string = route.url.join('');
    let toUrl: string = state.url;
    console.log('from', url, 'to', toUrl);
    if (this.isFirstRoute) {
      this.isFirstRoute = false;
      return this._doLogin();
    }
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

  _doLogin(): Promise<boolean> {
    let p: Promise<any>; // Auth Promise
    // If redirect by sso
    let ssoToken = this.negUtil.getQuery('t');
    if (ssoToken) {
      p = this.authService.login(ssoToken);
    } else {
      let token = this.negStorage.local.get('x-newkit-token');
      // No token
      if (!token) {
        p = Promise.reject('No token.');
      }
      // Auto login
      p = this.authService.autoLogin(token);
    }

    return new Promise((resolve, reject) => {
      p.then(() => {
        return this.authService.getSystemConfigData()
          .then(() => {
            this.negEventBus.emit('global.loginSucceed');
            resolve(true);
          }).catch(reason => {
            return Promise.reject('Get system config error.');
          });
      })
        .catch(reason => {
          let errorCount = (this.negStorage.local.get('login-error-count') || 0) + 1;
          if (errorCount > 3) {
            return console.log('login failed:', reason);
          }
          resolve(false);
          let ssoLoginUrl = `${NewkitConf.SSOAddress}/login?redirect_url=${window.location.href}`;
          window.location.href = ssoLoginUrl;
        });
    });


    //     this.negA
    // x-newkit-token:8d34b453abfaf5726aa48fa726301c39
  }
}