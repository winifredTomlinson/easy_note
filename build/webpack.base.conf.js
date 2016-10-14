let path = require('path');

let config = require('./config');
let root = path.resolve(__dirname, './src');
let ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: {
    'vendor': './src/newkit/nk-shell/vendor.ts',
    'newkit': './src/newkit/nk-shell/main.ts'
  },
  output: {
    path: config.build.assetsRoot,
    publicPath: config.dev.assetsPublicPath,
    filename: '[name].js'
  },
  externals: {
    '@angular/core': 'ng.core',
    '@angular/common': 'ng.common',
    '@angular/compiler': 'ng.compiler',
    '@angular/platform-browser': 'ng.platformBrowser',
    '@angular/platform-browser-dynamic': 'ng.platformBrowserDynamic',
    '@angular/http': 'ng.http',
    '@angular/forms': 'ng.forms',
    '@angular/router': 'ng.router'
  },
  resolve: {
    extensions: ['', '.js', '.ts', '.css', '.html']
  },
  module: {
    loaders: [
      { test: /\.ts$/, loaders: ['awesome-typescript-loader', 'angular2-template-loader'] },
      { test: /\.html$/, loader: 'raw-loader' },
      { test: /\.css$/, loader: ExtractTextPlugin.extract('style-loader', 'css-loader') },
      { test: /\.styl$/, loader: 'raw-loader!stylus-loader' }
    ]
  }
};