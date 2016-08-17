let path = require('path');

let config = require('./config');
let root = path.resolve(__dirname, '../');

module.exports = {
  entry: {
    'vendor': './src/newkit/nk-bootstrap/vendor.ts',
    'nk-core': ['./src/newkit/nk-core/index.ts'],
    'newkit': './src/newkit/nk-bootstrap/index.ts',

    'nk-common': './src/modules/nk-common/index.ts'
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
      { test: /\.ts$/, loader: 'ts-loader', include: root },
      { test: /\.html$/, loader: 'raw-loader' },
      { test: /\.css$/, loader: 'raw-loader' },
      { test: /\.styl$/, loader: 'raw-loader!stylus-loader' }
    ]
  }
};