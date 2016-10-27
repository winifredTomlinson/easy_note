const webpack = require('webpack');

module.exports = {
  // devtool: '#source-map',
  // watch: true,
  resolve: {
    extensions: ['', '.ts', '.js']
  },
  externals: {
    'rxjs': 'Rx',
    '@angular/common': 'ng.common',
    '@angular/compiler': 'ng.compiler',
    '@angular/core': 'ng.core',
    '@angular/http': 'ng.http',
    '@angular/platform-browser': 'ng.platformBrowser',
    '@angular/platform-browser-dynamic': 'ng.platformBrowserDynamic',
    '@angular/router': 'ng.router',
    '@angular/forms': 'ng.forms',

    'newkit/core': 'newkit["nk-core"]',
    'ng2-translate': 'window["ng2-translate"]'

    // 'rxjs/Observable': 'Rx.Observable',
    // 'rxjs/Subject': 'Rx.Subject',
    // 'rxjs/Subscription': 'Rx.Subscription',
    // 'rxjs/add/operator/auditTime': 'Rx.Observable.prototype.auditTime',
    // 'rxjs/add/operator/combineLatest': 'Rx.Observable.prototype.combineLatest',
    // 'rxjs/add/operator/filter': 'Rx.Observable.prototype.filter',
    // 'rxjs/add/operator/take': 'Rx.Observable.prototype.take',
    // 'rxjs/add/operator/takeUntil': 'Rx.Observable.prototype.takeUntil',
    // 'rxjs/add/operator/concatMap': 'Rx.Observable.prototype.concatMap',
    // 'rxjs/add/operator/merge': 'Rx.Observable.prototype.merge',
    // 'rxjs/add/operator/map': 'Rx.Observable.prototype.map',
    // 'rxjs/add/operator/do': 'Rx.Observable.prototype.do',
    // 'rxjs/add/operator/distinctUntilChanged': 'Rx.Observable.prototype.distinctUntilChanged',
    // 'rxjs/add/operator/debounceTime': 'Rx.Observable.prototype.debounceTime',
    // 'rxjs/add/operator/startWith': 'Rx.Observable.prototype.startWith',
    // 'rxjs/add/observable/fromEvent': 'rxjs/Observable.fromEvent',
    // 'rxjs/add/observable/interval': 'rxjs/Observable.interval',
    // 'rxjs/add/observable/merge': 'rxjs/Observable.merge'
    // 'rxjs/add/operator/combineLatest': 'Rx.Observable.prototype.combineLatest',
    // 'rxjs/add/operator/combineLatest': 'Rx.Observable.prototype.combineLatest',
    // 'rxjs/add/operator/combineLatest': 'Rx.Observable.prototype.combineLatest',
    // 'rxjs/add/operator/combineLatest': 'Rx.Observable.prototype.combineLatest',
    // 'rxjs/add/operator/combineLatest': 'Rx.Observable.prototype.combineLatest'
  },
  module: {
    loaders: [
      { test: /\.ts$/, loaders: ['awesome-typescript-loader', 'angular2-template-loader'] },
      { test: /\.html$/, loader: 'raw-loader' },
      { test: /\.css$/, loader: 'raw-loader' }
    ]
  }
};