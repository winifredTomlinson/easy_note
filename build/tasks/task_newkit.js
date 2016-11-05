const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const commonConfig = require('./../webpack.common.conf');
const util = require('./../util');

module.exports = {
  init(gulp) {
    gulp.task('build:newkit', done => {
      let opt = webpackMerge(commonConfig, {
        entry: {
          'nk-core': './src/newkit/nk-core/index.ts',
          'nk-shell': './src/newkit/nk-shell/index.ts',
          'polyfills': './src/polyfills.ts'
        },
        output: {
          path: './dist',
          filename: 'newkit/[name].js',
          library: ['newkit', '[name]'],
          liabraryTarget: 'umd',
          chunkFilename: '[id].js'
        },
        watch: true
      });
      webpack(opt).watch(200, (err, stats) => {
        util.showWebpackError(err, stats);
        done();
      });
    });

    gulp.task('build:nk-thirdparty', done => {
      webpack(
        webpackMerge(commonConfig, {
          entry: {
            'nk-thirdparty': './src/newkit/nk-thirdparty/index.ts'
          },
          output: {
            path: './dist',
            filename: 'newkit/[name].js',
            library: ['newkit', '[name]'],
            liabraryTarget: 'umd',
            chunkFilename: '[id].js',
          },
          watch: false
        }), (err, stats) => {
          util.showWebpackError(err, stats, false);
          done();
        });
    });
  }
};