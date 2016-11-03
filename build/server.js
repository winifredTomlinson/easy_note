const fs = require('fs');
const path = require('path');
const browserSync = require('browser-sync');
const historyApiFallback = require('connect-history-api-fallback');
const notifier = require('node-notifier');
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');

const commonConfig = require('./webpack.common.conf');
const util = require('./tasks/util');

let needServe = true;

const serve = () => {
  browserSync({
    server: {
      baseDir: './'
    },
    middleware: [historyApiFallback()],
    ghostMode: false,
    port: 10000
  });
};

const reload = () => {
  notifier.notify({ title: 'Newkit', message: 'Build successfully.' });
  browserSync.reload();
};

let entry = {};
// 构造entry
fs.readdirSync('./src/modules')
  .forEach(moduleName => {
    let stats = fs.statSync(`./src/modules/${moduleName}`);
    if (stats.isDirectory()) {
      entry[moduleName] = `./src/modules/${moduleName}/index.ts`;
    }
  });

webpack(
  webpackMerge(commonConfig, {
    entry: entry,
    output: {
      path: './dist/modules',
      filename: '[name]/app.js',
      library: ['newkit', '[name]'],
      liabraryTarget: 'umd',
      chunkFilename: '[id].js'
    },
    watch: true
  })
  , (err, stats) => {
    if (needServe) {
      serve();
      needServe = false;
    } else {
      reload();
    }
    util.showWebpackError(err, stats, false);
  });
