System.set('@angular/core', System.newModule(ng.core));
System.set('@angular/common', System.newModule(ng.common));
System.set('@angular/platform-browser', System.newModule(ng.platformBrowser));
System.set('@angular/platform-browser-dynamic', System.newModule(ng.platformBrowserDynamic));
System.set('@angular/http', System.newModule(ng.http));
System.set('@angular/forms', System.newModule(ng.forms));
System.set('@angular/router', System.newModule(ng.router));

System.set('rxjs', System.newModule(Rx));

SystemJS.import('nk-shell/main')
  .then(null)
  .catch(err => console.error(err));
