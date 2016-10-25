const gulp = require('gulp');
const concat = require('gulp-concat');
const ts = require('gulp-typescript');
const inlineNg2Template = require('gulp-inline-ng2-template');
const embedTemplates = require('gulp-angular-embed-templates');
const browserSync = require('browser-sync');
const historyApiFallback = require('connect-history-api-fallback');
const notifier = require('node-notifier');
const Builder = require('systemjs-builder');

['task_vendor', 'task_newkit', 'task_module'].forEach(item => {
  require(`./tasks/${item}`).init(gulp);
});

gulp.task('serve', done => {
  browserSync({
    server: {
      baseDir: './'
    },
    middleware: [historyApiFallback()],
    ghostMode: false,
    port: 10000
  });
  done();
});

let watchTimer = null;
gulp.task('watch', done => {
  let wather = gulp.watch([
    './index.html',
    './index.js',
    './src/config/*.js',
    './src/newkit/**/*'
  ], { debounceDelay: 500 });
  wather.on('change', (path, stats) => {
    //排除异常情况
    if (path.indexOf('.') < 0 || path.indexOf('___jb_') > 0) {
      return;
    }
    clearTimeout(watchTimer);
    watchTimer = setTimeout(() => {
      notifier.notify({ title: 'Newkit', message: 'Start build and reload...' });
      let tasks = [];
      if (path.indexOf('nk-core') >= 0) {
        tasks.push('nk-core');
      } else if (path.indexOf('nk-shell') >= 0) {
        tasks.push('nk-shell');
      }
      gulp.series(...tasks, 'bs-reload')();
    }, 1000);
  });
  done();
});

gulp.task('bs-reload', done => {
  notifier.notify({ title: 'Newkit', message: 'Build successfully.' });
  browserSync.reload();
  done();
});

gulp.task('default', gulp.series(
  gulp.parallel(/*'build:vendor', 'build:newkit', */'build:modules'),
  gulp.parallel('serve')
));