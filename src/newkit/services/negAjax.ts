import {Injectable} from '@angular/core';
import {Http} from '@angular/http';

import 'rxjs/add/operator/toPromise';

@Injectable()
export class negAjax {
  constructor(private http: Http) {

  }

  _handlerError(error: any) {
    console.error(error, 'global catch');
  }

  _request(type, url, body, options) {
    let p;
    switch (type) {
      case 'GET':
        p = this.http.get(url, options);
        break;
      case 'POST':
        p = this.http.post(url, body, options);
        break;
      case 'PUT':
        p = this.http.put(url, body, options);
        break;
      case 'DELETE':
        p = this.http.delete(url, options);
        break;
      default:
        throw new Error('Not Supported Method');
    }
    return new Promise((resolve, reject) => {
      p.toPromise()
        .then(res => resolve(res))
        .catch(err => {
          this._handlerError(err);
          reject(err);
        });
    });

  }

  public get(url: string, options?: any): Promise<any> {
    return this._request('GET', url, null, options);
  }

  public post(url: string, body: any, options?: any): Promise<any> {
    return this._request('POST', url, body, options);
  }

  public put(url: string, body: any, options?: any): Promise<any> {
    return this._request('PUT', url, body, options);
  }

  public delete(url: string, options?: any): Promise<any> {
    return this._request('DELETE', url, null, options);
  }
};