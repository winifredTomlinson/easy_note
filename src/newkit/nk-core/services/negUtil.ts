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
    let type = typeof value;
    return !!value && (type === 'object' || type === 'function');
  }

  isArray(value) {
    return Array.isArray(value);
  }

  isBuffer(value) {
    if (Buffer) {
      return Buffer.isBuffer(value);
    }
    return false;
  }

  isFunction(value) {
    // The use of `Object#toString` avoids issues with the `typeof` operator
    // in Safari 8-9 which returns 'object' for typed array and other constructors.
    var tag = this.isObject(value) ? Object.prototype.toString.call(value) : '';
    return tag == funcTag || tag == genTag;
  }

  isArrayLike(value) {
    return value != null && this._isLength(value.length) && !this.isFunction(value);
  }

  isObjectLike(value) {
    return !!value && typeof value == 'object';
  }

  isArrayLikeObject(value) {
    return this.isObjectLike(value) && this.isArrayLike(value);
  }

  isArguments(value) {
    // Safari 8.1 makes `arguments.callee` enumerable in strict mode.
    return this.isArrayLikeObject(value) && Object.prototype.hasOwnProperty.call(value, 'callee') &&
      (!Object.prototype.propertyIsEnumerable.call(value, 'callee') || Object.prototype.toString.call(value) == argsTag);
  }

  clone(value) {
    return this._baseClone(value, false, true);
  }

  cloneDeep(value) {
    return this._baseClone(value, true, true);
  }

  _isLength(value) {
    return typeof value == 'number' &&
      value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
  }
  _initCloneArray(array) {
    let length = array.length;
    let result = array.constructor(length);
    // Add properties assigned by `RegExp#exec`.
    if (length && typeof array[0] == 'string' && Object.prototype.hasOwnProperty.call(array, 'index')) {
      result.index = array.index;
      result.input = array.input;
    }
    return result;
  }

  _copyArray(source, array) {
    let index = -1;
    let length = source.length;
    array || (array = Array(length));
    while (++index < length) {
      array[index] = source[index];
    }
    return array;
  }

  _eq(value, other) {
    return value === other || (value !== value && other !== other);
  }

  _assignValue(object, key, value) {
    let objValue = object[key];
    if (!(Object.prototype.hasOwnProperty.call(object, key) && this._eq(objValue, value)) ||
      (value === undefined && !(key in object))) {
      object[key] = value;
    }
  }
  _cloneBuffer(buffer, isDeep) {
    if (isDeep) {
      return buffer.slice();
    }
    let result = new buffer.constructor(buffer.length);
    buffer.copy(result);
    return result;
  }
  _isPrototype(value) {
    let Ctor = value && value.constructor;
    let proto = (typeof Ctor == 'function' && Ctor.prototype) || Object.prototype;
    return value === proto;
  }

  _overArg(func, transform) {
    return function (arg) {
      return func(transform(arg));
    };
  }
  _getPrototype(obj) {
    return this._overArg(Object.getPrototypeOf, Object)(obj);
  }

  _baseCreate(proto) {
    return this.isObject(proto) ? Object.create(proto) : {};
  }

  _initCloneObject(object) {
    return (typeof object.constructor == 'function' && !this._isPrototype(object))
      ? this._baseCreate(this._getPrototype(object))
      : {};
  }

  _cloneArrayBuffer(arrayBuffer) {
    var result = new arrayBuffer.constructor(arrayBuffer.byteLength);
    new Uint8Array(result).set(new Uint8Array(arrayBuffer));
    return result;
  }

  _cloneTypedArray(typedArray, isDeep) {
    var buffer = isDeep ? this._cloneArrayBuffer(typedArray.buffer) : typedArray.buffer;
    return new typedArray.constructor(buffer, typedArray.byteOffset, typedArray.length);
  }
  _cloneDataView(dataView, isDeep) {
    var buffer = isDeep ? this._cloneArrayBuffer(dataView.buffer) : dataView.buffer;
    return new dataView.constructor(buffer, dataView.byteOffset, dataView.byteLength);
  }
  _mapToArray(map) {
    let index = -1;
    let result = Array(map.size);

    map.forEach(function (value, key) {
      result[++index] = [key, value];
    });
    return result;
  }
  _addMapEntry(map, pair) {
    // Don't return `map.set` because it's not chainable in IE 11.
    map.set(pair[0], pair[1]);
    return map;
  }
  _setToArray(set) {
    let index = -1;
    let result = Array(set.size);
    set.forEach(function (value) {
      result[++index] = value;
    });
    return result;
  }
  _arrayReduce(array, iteratee, accumulator, initAccum?) {
    let index = -1;
    let length = array ? array.length : 0;
    if (initAccum && length) {
      accumulator = array[++index];
    }
    while (++index < length) {
      accumulator = iteratee(accumulator, array[index], index, array);
    }
    return accumulator;
  }
  _cloneMap(map, isDeep, cloneFunc) {
    var array = isDeep ? cloneFunc(this._mapToArray(map), true) : this._mapToArray(map);
    return this._arrayReduce(array, this._addMapEntry, new map.constructor);
  }
  _cloneRegExp(regexp) {
    var result = new regexp.constructor(regexp.source, reFlags.exec(regexp));
    result.lastIndex = regexp.lastIndex;
    return result;
  }
  _cloneSet(set, isDeep, cloneFunc) {
    var array = isDeep ? cloneFunc(this._setToArray(set), true) : this._setToArray(set);
    return this._arrayReduce(array, this._addMapEntry, new set.constructor);
  }
  _cloneSymbol(symbol) {
    return symbolValueOf ? Object(symbolValueOf.call(symbol)) : {};
  }

  _initCloneByTag(object, tag, cloneFunc, isDeep) {
    var Ctor = object.constructor;
    switch (tag) {
      case arrayBufferTag:
        return this._cloneArrayBuffer(object);
      case boolTag:
      case dateTag:
        return new Ctor(+object);
      case dataViewTag:
        return this._cloneDataView(object, isDeep);
      case float32Tag: case float64Tag:
      case int8Tag: case int16Tag: case int32Tag:
      case uint8Tag: case uint8ClampedTag: case uint16Tag: case uint32Tag:
        return this._cloneTypedArray(object, isDeep);
      case mapTag:
        return this._cloneMap(object, isDeep, cloneFunc);
      case numberTag:
      case stringTag:
        return new Ctor(object);
      case regexpTag:
        return this._cloneRegExp(object);
      case setTag:
        return this._cloneSet(object, isDeep, cloneFunc);
      case symbolTag:
        return this._cloneSymbol(object);
    }
  }
  _getSymbols(value) {
    if (Object['getOwnPropertySymbols']) {
      this._overArg(Object['getOwnPropertySymbols'], Object)(value);
    }
    return [];
  }
  _copyObject(source, props, object, customizer?) {
    object || (object = {});
    let index = -1;
    let length = props.length;
    while (++index < length) {
      let key = props[index];
      let newValue = customizer
        ? customizer(object[key], source[key], key, object, source)
        : undefined;
      this._assignValue(object, key, newValue === undefined ? source[key] : newValue);
    }
    return object;
  }
  _copySymbols(source, object) {
    return this._copyObject(source, this._getSymbols(source), object);
  }
  _baseTimes(n, iteratee) {
    let index = -1;
    let result = Array(n);
    while (++index < n) {
      result[index] = iteratee(index);
    }
    return result;
  }
  _isIndex(value, length) {
    length = length == null ? MAX_SAFE_INTEGER : length;
    return !!length &&
      (typeof value == 'number' || reIsUint.test(value)) &&
      (value > -1 && value % 1 == 0 && value < length);
  }

  _arrayLikeKeys(value, inherited?) {
    // Safari 8.1 makes `arguments.callee` enumerable in strict mode.
    // Safari 9 makes `arguments.length` enumerable in strict mode.
    var result = (this.isArray(value) || this.isArguments(value))
      ? this._baseTimes(value.length, String)
      : [];

    var length = result.length,
      skipIndexes = !!length;

    for (var key in value) {
      if ((inherited || Object.prototype.hasOwnProperty.call(value, key)) &&
        !(skipIndexes && (key == 'length' || this._isIndex(key, length)))) {
        result.push(key);
      }
    }
    return result;
  }
  _baseKeys(object) {
    if (!this._isPrototype(object)) {
      return this._overArg(Object.keys, Object)(object);
    }
    var result = [];
    for (var key in Object(object)) {
      if (Object.prototype.hasOwnProperty.call(object, key) && key != 'constructor') {
        result.push(key);
      }
    }
    return result;
  }

  _keys(object) {
    return this.isArrayLike(object) ? this._arrayLikeKeys(object) : this._baseKeys(object);
  }
  _baseAssign(object, source) {
    return object && this._copyObject(source, this._keys(source), object);
  }
  _arrayEach(array, iteratee) {
    let index = -1;
    let length = array ? array.length : 0;
    while (++index < length) {
      if (iteratee(array[index], index, array) === false) {
        break;
      }
    }
    return array;
  }
  _arrayPush(array, values) {
    let index = -1;
    let length = values.length;
    let offset = array.length;

    while (++index < length) {
      array[offset + index] = values[index];
    }
    return array;
  }
  _baseGetAllKeys(object, keysFunc, symbolsFunc) {
    var result = keysFunc(object);
    return this.isArray(object) ? result : this._arrayPush(result, symbolsFunc(object));
  }

  _getAllKeys(object) {
    return this._baseGetAllKeys(object, this._keys, this._getSymbols);
  }



  _baseClone(value, isDeep, isFull, customizer?, key?, object?, stack?) {
    var result;
    if (customizer) {
      result = object ? customizer(value, key, object, stack) : customizer(value);
    }
    if (result !== undefined) {
      return result;
    }
    if (!this.isObject(value)) {
      return value;
    }
    var isArr = this.isArray(value);
    if (isArr) {
      result = this._initCloneArray(value);
      if (!isDeep) {
        return this._copyArray(value, result);
      }
    } else {
      var tag = Object.prototype.toString.call(value),
        isFunc = tag == '[object Function]' || tag == '[object GeneratorFunction]';

      if (this.isBuffer(value)) {
        return this._cloneBuffer(value, isDeep);
      }
      if (tag == '[object Object]' || tag == '[object Arguments]' || (isFunc && !object)) {
        result = this._initCloneObject(isFunc ? {} : value);
        if (!isDeep) {
          return this._copySymbols(value, this._baseAssign(result, value));
        }
      } else {
        if (!cloneableTags[tag]) {
          return object ? value : {};
        }
        result = this._initCloneByTag(value, tag, this._baseClone, isDeep);
      }
    }
    // Check for circular references and return its corresponding clone.
    stack || (stack = new Stack);
    var stacked = stack.get(value);
    if (stacked) {
      return stacked;
    }
    stack.set(value, result);

    if (!isArr) {
      var props = isFull ? this._getAllKeys(value) : this._keys(value);
    }
    this._arrayEach(props || value, function (subValue, key) {
      if (props) {
        key = subValue;
        subValue = value[key];
      }
      // Recursively populate clone (susceptible to call stack limits).
      this._assignValue(result, key, this._baseClone(subValue, isDeep, isFull, customizer, key, value, stack));
    });
    return result;
  }
}