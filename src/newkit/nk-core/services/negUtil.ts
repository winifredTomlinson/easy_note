import { Injectable } from '@angular/core';

@Injectable()
export class NegUtil {

  private window: any;

  constructor() {
    this.window = window;
  }

  encodeUri(text: string): string {
    return this.window.encodeURI(text);
  }

  decodeUri(text: string): string {
    return this.window.decodeURI(text);
  }

  escape(text: string): string {
    return this.window.escape(text);
  }

  unescape(text: string): string {
    return this.window.unescape(text);
  }

  isObject(value) {
    return _.isObject(value);
  }

  isArray(value) {
    return _.isArray(value);
  }

  isBuffer(value) {
    return _.isBuffer(value);
  }

  isFunction(value) {
    return _.isFunction(value);
  }

  isArrayLike(value) {
    return _.isArrayLike(value);
  }

  isObjectLike(value) {
    return _.isObjectLike(value);
  }

  isArrayLikeObject(value) {
    return _.isArrayLikeObject(value);
  }

  isArguments(value) {
    return _.isArguments(value);
  }

  clone(value) {
    return _.clone(value);
  }

  cloneDeep(value) {
    return _.cloneDeep(value);
  }

  getQuery(key?: string): any {
    let search = window.location.search.substring(1);
    let searchArr = search.split('&');
    let result = {};
    searchArr.forEach(s => {
      let sArr = s.split('=');
      result[sArr[0]] = sArr.length === 2 ? sArr[1] : null;
    });
    if (key) {
      return result[key];
    }
    return result;
  }
}