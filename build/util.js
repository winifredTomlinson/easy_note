const gutil = require('gulp-util');

const showWebpackError = (err, stats) => {
  if (err) {
    throw new gutil.PluginError('webpack', err);
  }
  let statColor = stats.compilation.warnings.length < 1 ? 'green' : 'yellow';
  if (stats.compilation.warnings.length > 0) {
    stats.compilation.errors.forEach(error => {
      statColor = 'red';
    });
  } else {
    gutil.log(stats.toString({
      colors: gutil.colors.supportsColor,
      hash: false,
      timings: true,
      chunks: true,
      chunkModules: false,
      modules: false,
      children: false,
      version: true,
      cached: true,
      cachedAssets: true,
      reasons: false,
      source: false,
      errorDetails: false
    }));
  }
};

const cssLoaders = options => {
  var sourceLoader = loaders.map(function (loader) {
      var extraParamChar;
      if (/\?/.test(loader)) {
        loader = loader.replace(/\?/, '-loader?');
        extraParamChar = '&';
      } else {
        loader = loader + '-loader';
        extraParamChar = '?';
      }
      return loader + (options.sourceMap ? extraParamChar + 'sourceMap' : '');
    }).join('!');

    // Extract CSS when that option is specified
    // (which is the case during production build)
    if (options.extract) {
      return ExtractTextPlugin.extract('vue-style-loader', sourceLoader);
    } else {
      return ['vue-style-loader', sourceLoader].join('!');
    }
      return {
    css: generateLoaders(['css']),
    postcss: generateLoaders(['css']),
    less: generateLoaders(['css', 'less']),
    sass: generateLoaders(['css', 'sass?indentedSyntax']),
    scss: generateLoaders(['css', 'sass']),
    stylus: generateLoaders(['css', 'stylus']),
    styl: generateLoaders(['css', 'stylus'])
  };
};

module.exports = {
  showWebpackError,
  cssLoaders
};
