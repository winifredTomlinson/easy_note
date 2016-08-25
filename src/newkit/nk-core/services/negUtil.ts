import { Injectable } from '@angular/core';

let argsTag = '[object Arguments]',
  arrayTag = '[object Array]',
  boolTag = '[object Boolean]',
  dateTag = '[object Date]',
  errorTag = '[object Error]',
  funcTag = '[object Function]',
  genTag = '[object GeneratorFunction]',
  mapTag = '[object Map]',
  numberTag = '[object Number]',
  objectTag = '[object Object]',
  promiseTag = '[object Promise]',
  regexpTag = '[object RegExp]',
  setTag = '[object Set]',
  stringTag = '[object String]',
  symbolTag = '[object Symbol]',
  weakMapTag = '[object WeakMap]',
  weakSetTag = '[object WeakSet]';

let arrayBufferTag = '[object ArrayBuffer]',
  dataViewTag = '[object DataView]',
  float32Tag = '[object Float32Array]',
  float64Tag = '[object Float64Array]',
  int8Tag = '[object Int8Array]',
  int16Tag = '[object Int16Array]',
  int32Tag = '[object Int32Array]',
  uint8Tag = '[object Uint8Array]',
  uint8ClampedTag = '[object Uint8ClampedArray]',
  uint16Tag = '[object Uint16Array]',
  uint32Tag = '[object Uint32Array]';

let cloneableTags = {};
cloneableTags[argsTag] = cloneableTags[arrayTag] =
  cloneableTags[arrayBufferTag] = cloneableTags[dataViewTag] =
  cloneableTags[boolTag] = cloneableTags[dateTag] =
  cloneableTags[float32Tag] = cloneableTags[float64Tag] =
  cloneableTags[int8Tag] = cloneableTags[int16Tag] =
  cloneableTags[int32Tag] = cloneableTags[mapTag] =
  cloneableTags[numberTag] = cloneableTags[objectTag] =
  cloneableTags[regexpTag] = cloneableTags[setTag] =
  cloneableTags[stringTag] = cloneableTags[symbolTag] =
  cloneableTags[uint8Tag] = cloneableTags[uint8ClampedTag] =
  cloneableTags[uint16Tag] = cloneableTags[uint32Tag] = true;
cloneableTags[errorTag] = cloneableTags[funcTag] =
  cloneableTags[weakMapTag] = false;

let reFlags = /\w*$/;
let reIsUint = /^(?:0|[1-9]\d*)$/;
let MAX_SAFE_INTEGER = 9007199254740991;

let symbolProto = window['Symbol'] ? window['Symbol'].prototype : undefined,
  symbolValueOf = symbolProto ? symbolProto.valueOf : undefined,
  symbolToString = symbolProto ? symbolProto.toString : undefined;

let ListCache = function (entries) {
  let index = -1;
  let length = entries ? entries.length : 0;

  this.clear();
  while (++index < length) {
    let entry = entries[index];
    this.set(entry[0], entry[1]);
  }
}

function Stack(entries?) {
  this.__data__ = new ListCache(entries);
}


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