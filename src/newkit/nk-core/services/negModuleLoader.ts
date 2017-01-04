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
      this._loadCss(moduleName);
      this.http.get(path)
        .toPromise()
        .then(res => {
          let code = res.text();
          this._DomEval(code);
          resolve(window['newkit'][moduleName].AppModule);
        }).catch(err => reject(err));
    });
  }

  useModuleStyles(moduleName: string) :void {
    let newkitModuleStyles = [].slice.apply(document.querySelectorAll('.newkit-module-style'));
    newkitModuleStyles.forEach(link => {
      link.disabled = link.className.indexOf(moduleName) < 0;
    });
  }

  _loadCss(moduleName: string): void {
    let cssPath = `/dist/modules/${moduleName}/app.css`;
    let link = document.createElement('link');
    link.setAttribute('rel', 'stylesheet');
    link.setAttribute('href', cssPath);
    link.setAttribute('class', `newkit-module-style ${moduleName}`);
    document.querySelector('head').appendChild(link);
    this.useModuleStyles(moduleName);
  }

  _DomEval(code, doc?) {
    doc = doc || document;
    let script = doc.createElement('script');
    script.text = code;
    doc.head.appendChild(script).parentNode.removeChild(script);
  }
}
