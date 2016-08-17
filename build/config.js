let path = require('path');

module.exports = {
  build: {
    env: 'production',
    index: path.resolve(__dirname, '../dist/index.html'),
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    productionSourceMap: true,
    productionGzip: false
  },
  dev: {
    env: 'development',
    port: 7410,
    assetsPublicPath: '/',
    assetsSubDirectory: 'static'
  }
}