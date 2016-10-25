const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');

const commonConfig = require('./../webpack.common.conf');

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
          liabraryTarget: 'umd'
        },
      })
      , (err, stats) => {
        if (err) return console.error(err);
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