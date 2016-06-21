'use strict';

let path = require('path');
let webpack = require('webpack');
let CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;
let CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  debug: true,
  entry: {
    polyfills: './src/polyfills.ts',
    vendor: './src/vendor.ts',
    newkit: ['./src/newkit/newkit.ts'],
    bootstrap: './src/bootstrap.ts'
  },
  output: {
    path: 'dist/assets/js',
    filename: '[name].js'
  },
  resolve: {
    extensions: ['', '.ts', '.js', '.css', '.html']
  },
  module: {
    loaders: [
      { test: /\.tsx?$/, loader: 'ts-loader' },
      { test: /\.html$/, loader: 'html-loader' },
      { test: /\.css$/, include: path.join(__dirname, '/src/nk-shell'), loader: 'raw-loader'},
      { test: /\.css$/, include:  path.join(__dirname, '/node_modules'), loader: 'style!css'}
    ]
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: ['newkit', 'vendor', 'polyfills']
    }),
    new CopyWebpackPlugin([
      { from: './src/index.html', to: path.join(__dirname, 'dist') },
      { from: './src/assets', to: path.join(__dirname, 'dist/assets') }
    ])
  ],
  devServer: {
    historyApiFallback: true
  }
};