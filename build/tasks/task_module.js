const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const commonConfig = require('./../webpack.common.conf');
const util = require('./util');

module.exports = {
  init(gulp) {
    let entry = {};
    // 构造entry
    fs.readdirSync('./src/modules')
      .forEach(moduleName => {
        let stats = fs.statSync(`./src/modules/${moduleName}`);
        if (stats.isDirectory()) {
          entry[moduleName] = `./src/modules/${moduleName}/index.ts`;
        }
      });

    // 创建任务
    gulp.task('build:modules', done => {
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
          util.showWebpackError(err, stats);
          done();
        });
    });
  }
};