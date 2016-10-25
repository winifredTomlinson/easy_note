const webpack = require('webpack');
const webpackMerge = require('webpack-merge');

let commonConfig = require('./webpack.common.conf');

module.exports = webpackMerge(commonConfig, {
  entry: {
    'nk-core': ['./src/newkit/nk-core/index.ts'],
    'nk-shell': './src/newkit/nk-shell/index.ts'
  },
  output: {
    path: './dist',
    filename: 'newkit/[name].js',
    library: ['newkit', '[name]'],
    liabraryTarget: 'umd'
  },
  plugins: [

  ]
});