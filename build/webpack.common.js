const path = require('path');
const webpack = require('webpack');
const { CheckerPlugin } = require('awesome-typescript-loader');

module.exports = {
  devtool: 'cheap-source-map',
  cache: true,
  profile: true,
  watch: true,
  resolve: {
    extensions: ['.ts', '.js']
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

    'newkit/core': 'newkit["nk-core"]'
  },
  module: {
    rules: [
      { test: /\.ts$/, use: ['awesome-typescript-loader', 'angular2-template-loader'], exclude: /node_modules/ },
      { test: /\.html$/, loader: 'raw-loader' },
      { test: /\.css$/, loader: 'raw-loader' }
    ]
  },
  plugins: [
    new CheckerPlugin()
  ]
};