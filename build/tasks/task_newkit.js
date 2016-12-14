const webpack = require('webpack');
const webpackMerge = require('webpack-merge');

const commonConfig = require('./../webpack.common');
const util = require('./../util');

module.exports = (gulp, params) => {
   gulp.task('build:newkit', done => {
    let opt = webpackMerge(commonConfig, {
      entry: {
        'nk-core': './src/newkit/nk-core/index.ts',
        'nk-shell': './src/newkit/nk-shell/index.ts'
      },
      output: {
        path: './dist',
        filename: 'newkit/[name].js',
        library: ['newkit', '[name]'],
        chunkFilename: '[id].js'
      }
    });
    webpack(opt).watch(200, (err, stats) => {
      util.showWebpackError(err, stats);
      done();
    });
  });
};