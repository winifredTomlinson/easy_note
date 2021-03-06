import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';

@Injectable()
export class NegAjax {

  constructor(private http: Http) {

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

  _handlerError(error: any) {
    console.error(error, 'global catch');
  }

  _buildOptions(options, type) {
    let headers = new Headers();
    headers.append('Accept', 'application/json');
    if (type !== 'GET' && type !== 'DELETE') {
      headers.append('Content-Type', 'application/json');
    }
    if (options && options.headers && typeof options.headers === 'object') {
      Object.keys(options.headers).forEach(k => {
        headers.set(k, options.headers[k]);
      });
    }
    let reqOptions = new RequestOptions({
      headers: headers
    });
    return reqOptions;
  }

  _request(type, url, body, options) {
    let p;
    switch (type) {
      case 'GET':
        p = this.http.get(url, this._buildOptions(options, 'GET'));
        break;
      case 'POST':
        p = this.http.post(url, body, this._buildOptions(options, 'POST'));
        break;
      case 'PUT':
        p = this.http.put(url, body, this._buildOptions(options, 'PUT'));
        break;
      case 'DELETE':
        p = this.http.delete(url, this._buildOptions(options, 'DELETE'));
        break;
      default:
        throw new Error('Not Supported Method');
    }
    return p.toPromise()
      .then(res => {
        return res;
      }).catch(err => {
        this._handlerError(err);
        return Promise.reject(err);
      });
  }
};
