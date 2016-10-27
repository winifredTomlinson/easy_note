const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
const TsConfigPathsPlugin = require('awesome-typescript-loader').TsConfigPathsPlugin;

const commonConfig = require('./../webpack.common.conf');

module.exports = {
  init(gulp) {
    gulp.task('build:nk-core', done => {
      let opt = webpackMerge(commonConfig, {
        entry: {
          'nk-core': './src/newkit/nk-core/index.ts',
        },
        output: {
          path: './dist',
          filename: 'newkit/[name].js',
          library: ['newkit', '[name]'],
          liabraryTarget: 'umd'
        }
      });
      webpack(opt, (err, stats) => {
        if (err) return console.error(err);
        done();
      });
    });

    gulp.task('build:nk-shell', done => {
      webpack(
        webpackMerge(commonConfig, {
          entry: {
            'nk-shell': './src/newkit/nk-shell/index.ts'
          },
          output: {
            path: './dist',
            filename: 'newkit/[name].js',
            library: ['newkit', '[name]'],
            liabraryTarget: 'umd'
          },
        })
        , (err, stats) => {
          if (err) return console.error(err);
          done();
        });
    });

    gulp.task('build:newkit', gulp.parallel('build:nk-core', 'build:nk-shell'));
  }
};