import { Injectable } from '@angular/core';

class ModuleStore {
  constructor(private moduleName: string, private store: {}, private mutations: {}) {

  }
}

const storeMap = new Map<string, ModuleStore>();

@Injectable()
export class NegStore {
  constructor() { }

  registerModule(moduleName: string, store: {}, mutations: {}) {
    let moduleStore = new ModuleStore(moduleName, store, mutations);
    if (storeMap.has(moduleName)) {
      throw new Error(`${moduleName} exists.`);
    }
    storeMap.set(moduleName, moduleStore);
  }

  commit(moduleName: string, type: string, payload?: {}, options?: any) {

  }

  watch(moduleName: string, watcherObj) {

  }
}