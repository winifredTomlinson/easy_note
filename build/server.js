var path = require('path');
var express = require('express');
var webpack = require('webpack');
const webpackMerge = require('webpack-merge');
var webpackConfig = require('./webpack.common.conf');
// default port where dev server listens for incoming traffic
var port = 3000;
// Define HTTP proxies to your custom API backend
// https://github.com/chimurai/http-proxy-middleware


let opt = webpackMerge(webpackConfig, {
  entry: {
    'nk-shell': './src/newkit/nk-shell/index.ts',
    // 'nk-core': './src/newkit/nk-core/index.ts'
  },
  cache: true,
  output: {
    path: '/',
    filename: 'newkit/[name].js',
    library: ['newkit', '[name]'],
    liabraryTarget: 'umd',
    chunkFilename: '[chunkhash].js'
  },
});

var app = express();
var compiler = webpack(opt);

var devMiddleware = require('webpack-dev-middleware')(compiler, {
  publicPath: 'http://localhost:3000',
  stats: {
    colors: true,
    chunks: false
  }
});

var hotMiddleware = require('webpack-hot-middleware')(compiler);
// force page reload when html-webpack-plugin template changes
compiler.plugin('compilation', function (compilation) {
  compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
    hotMiddleware.publish({ action: 'reload' });
    cb();
  });
});


// handle fallback for HTML5 history API
app.use(require('connect-history-api-fallback')());

// serve webpack bundle output
app.use(devMiddleware);

// enable hot-reload and state-preserving
// compilation error display
app.use(hotMiddleware);
module.exports = app.listen(port, function (err) {
  if (err) {
    console.log(err);
    return;
  }
  console.log('Listening at http://localhost:' + port + '\n');
});
