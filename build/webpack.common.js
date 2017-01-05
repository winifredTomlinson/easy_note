const path = require('path');
const webpack = require('webpack');
const { CheckerPlugin } = require('awesome-typescript-loader');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  devtool: 'cheap-source-map',
  cache: true,
  profile: true,
  watch: true,
  resolve: {
    extensions: ['.ts', '.js']
  },
  externals: [{
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
  }, function (context, request, callback) {
    if (request.indexOf('newkit/') === 0) {
      let key = request.split('/')[1];
      return callback(null, `var newkit['${key}']`);
    }
    callback();
  }],
  module: {
    rules: [
      { test: /\.ts$/, use: ['awesome-typescript-loader', 'angular2-template-loader'], exclude: /node_modules/ },
      { test: /\.html$/, loader: 'raw-loader' },
      { test: /\.css$/, loader: ExtractTextPlugin.extract({ loader: 'css-loader' }) },
      { test: /\.styl$/, loader: ExtractTextPlugin.extract({ loader: 'css-loader!stylus-loader' }) },
      { test: /\.less$/, loader: ExtractTextPlugin.extract({ loader: 'css-loader!less-loader' }) },
      { test: /\.scss$/, loader: ExtractTextPlugin.extract({ loader: 'css-loader!sass-loader' }) },
      { test: /\.sass$/, loader: ExtractTextPlugin.extract({ loader: 'css-loader!sass-loader?indentedSyntax=true' }) }
    ]
  },
  plugins: [
    new CheckerPlugin()
  ]
};