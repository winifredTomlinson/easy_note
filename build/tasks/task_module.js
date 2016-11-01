const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const commonConfig = require('./../webpack.common.conf');
const util = require('./util');

let tasks = [];
let createModuleTask = (moduleName, gulp) => {
  let taskName = `build:modules.${moduleName}`;
  gulp.task(taskName, done => {
    webpack(
      webpackMerge(commonConfig, {
        entry: {
          [moduleName]: `./src/modules/${moduleName}/index.ts`,
        },
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
  return taskName;
};

module.exports = {
  init(gulp) {
    fs.readdirSync('./src/modules')
      .forEach(moduleName => {
        let stats = fs.statSync(`./src/modules/${moduleName}`);
        if (stats.isDirectory()) {
          tasks.push(createModuleTask(moduleName, gulp));
        }
      });
    gulp.task('build:modules', gulp.parallel(...tasks));
  }
};