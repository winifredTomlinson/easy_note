const path = require('path');
const webpack = require('webpack');

module.exports = {
  // devtool: 'eval',
  devtool: false,
  debug: true,
  cache: true,
  profile: true,
  stats: {
    hash: true,
    version: true,
    timings: true,
    assets: true,
    chunks: true,
    modules: true,
    reasons: true,
    children: true,
    source: false,
    errors: true,
    errorDetails: true,
    warnings: true,
    publicPath: true
  },
  resolve: {
    extensions: ['', '.ts', '.js'],
    root: path.resolve(__dirname),
    resolve: [
      'node_modules'
    ],
    unsafeCache: true
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

    'ng2-translate': 'window["ng2-translate"]',

    'newkit/core': 'newkit["nk-core"]',
    'newkit/thirdparty': 'newkit["nk-thirdparty"]'
  },
  module: {
    loaders: [
      { test: /\.ts$/, loaders: ['awesome-typescript-loader', 'angular2-template-loader'] },
      { test: /\.html$/, loader: 'raw-loader' },
      { test: /\.css$/, loader: 'raw-loader' }
    ]
  }
};