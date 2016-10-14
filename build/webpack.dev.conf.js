let webpack = require('webpack');
let merge = require('webpack-merge');
let CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;
let HtmlWebpackPlugin = require('html-webpack-plugin');
let ExtractTextPlugin = require('extract-text-webpack-plugin');


let config = require('./config');
let baseWebpackConfig = require('./webpack.base.conf');

let key = 'vendor';
baseWebpackConfig.entry[key] = ['./build/dev-client'].concat(baseWebpackConfig.entry[key]);

module.exports = merge(baseWebpackConfig, {
  devtool: '#source-map',
  plugins: [
    new CommonsChunkPlugin({
      names: ['vendor']
    }),
    new webpack.DefinePlugin({
      'process.env': config.dev.env
    }),
    new ExtractTextPlugin('newkit.css'),
    // https://github.com/glenjamin/webpack-hot-middleware#installation--usage
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true
    })
  ]
});