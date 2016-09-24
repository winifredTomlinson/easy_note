let path = require('path');

let config = require('./config');
let root = path.resolve(__dirname, './src');

module.exports = {
  entry: {
    'vendor': './src/newkit/nk-shell/vendor.ts',
    'nk-core': ['./src/newkit/nk-core/index.ts'],
    'newkit': './src/newkit/nk-shell/main.ts'
    // 'nk-common': './src/modules/nk-common/index.ts'
  },
  output: {
    path: config.build.assetsRoot,
    publicPath: config.dev.assetsPublicPath,
    filename: '[name].js'
  },
  resolve: {
    extensions: ['', '.js', '.ts', '.css', '.html']
  },
  module: {
    loaders: [
      { test: /\.ts$/, loaders: ['awesome-typescript-loader', 'angular2-template-loader'] },
      { test: /\.html$/, loader: 'raw-loader' },
      { test: /\.css$/, loader: 'raw-loader' },
      { test: /\.styl$/, loader: 'raw-loader!stylus-loader' }
    ]
  }
};