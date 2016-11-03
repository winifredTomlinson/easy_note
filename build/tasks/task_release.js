const fs = require('fs');
const path = require('path');
const webpack = require('webpack');
const concat = require('gulp-concat');
const webpackMerge = require('webpack-merge');
const commonConfig = require('./../webpack.common.conf');
const util = require('./../util');

module.exports = {
  init(gulp) {
    gulp.task('release:clean', done => {
      rm('release -r');
      done();
    });

    gulp.task('release:copyResource', () => {
      return gulp.src([
        './dist/assets*/**/*',
        './dist/newkit*/**/*',
        './tsconfig.json',
        './build*/server.js',
        './build*/util.js',
        './build*/webpack.common.conf.js',
        './typings.json',
        './package.json',
        './src*/modules/README.md',
        './src*/config/config.js',
        './index.html',
      ]).pipe(gulp.dest('./release'));
    });

    gulp.task('release:html', () => {
      return gulp.src([
        './index-release.html'
      ]).pipe(concat('index.html'))
        .pipe(gulp.dest('./release'));
    });

    gulp.task('release', gulp.series('release:clean', 'release:copyResource', 'release:html'));
  }
};