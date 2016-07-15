'use strict';

let path = require('path');
let webpack = require('webpack');
let CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;
let CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  debug: true,
  entry: {
    'polyfills': './src/newkit/nk-bootstrap/polyfills.ts',
    'vendor': './src/newkit/nk-bootstrap/vendor.ts',
    'nk-core': ['./src/newkit/nk-core/index.ts'],
    'newkit': './src/newkit/nk-bootstrap/index.ts',

    'nk-common': './src/modules/nk-common/app.state.ts'
  },
  output: {
    path: 'dist/assets/js',
    publicPath: '/assets/js/',
    filename: '[name].js',
    chunkName: '[name].[hash].js'
  },
  resolve: {
    root: [path.resolve(__dirname)],
    extensions: ['', '.ts', '.js', '.css', '.html']
  },
  module: {
    loaders: [
      { test: /\.tsx?$/, loader: 'ts-loader' },
      { test: /\.html$/, loader: 'html-loader' },
      { test: /\.css$/, include: path.join(__dirname, '/src/newkit/nk-shell'), loader: 'raw-loader' },
      { test: /\.css$/, include: path.join(__dirname, '/node_modules'), loader: 'style!css' }
    ]
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: ['nk-core', 'vendor', 'polyfills']
    }),
    new CopyWebpackPlugin([
      { from: './src/index.html', to: path.join(__dirname, 'dist') },
      { from: './assets', to: path.join(__dirname, 'dist/assets') }
    ])
  ],
  devServer: {
    historyApiFallback: true
  }
};