import { Injectable, Inject } from '@angular/core';
import { Http } from '@angular/http';

const loadedModules: Set<string> = new Set<string>();

let instance = null;

@Injectable()
export class NegModuleLoader {

  public static load(moduleName) {
    return instance.load(moduleName);
  }

  constructor(private http: Http) {
    instance = this;
  }

  load(moduleName): Promise<any> {
    return new Promise((resolve, reject) => {
      let path = `/dist/modules/${moduleName}/app.js`;
      this.http.get(path)
        .toPromise()
        .then(res => {
          let code = res.text();
          this._DomEval(code);
          resolve(window['newkit'][moduleName].AppModule);
        }).catch(err => reject(err));
    });
  }

  _DomEval(code, doc?) {
    doc = doc || document;
    let script = doc.createElement('script');
    script.text = code;
    doc.head.appendChild(script).parentNode.removeChild(script);
  }
}
