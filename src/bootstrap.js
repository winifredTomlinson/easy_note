((ng, app) => {
  'use strict';
  let provide = ng.core.provide;
  let bootstrap = ng.platformBrowserDynamic.bootstrap;
  let LocationStrategy = ng.common.LocationStrategy;
  let HashLocationStrategy = ng.common.HashLocationStrategy;

  bootstrap(app.AppComponent, [
    provide(LocationStrategy, {
      useClass: HashLocationStrategy
    })
  ]);

})(window.ng, window.NewkitApp);

jQuery(function () {
  jQuery('html').niceScroll({
    autohidemode: false,
    cursorcolor: '#2dc3e8'
  });
});