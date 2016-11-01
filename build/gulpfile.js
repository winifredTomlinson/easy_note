const gulp = require('gulp');
const concat = require('gulp-concat');
const browserSync = require('browser-sync');
const historyApiFallback = require('connect-history-api-fallback');
const notifier = require('node-notifier');

['task_vendor', 'task_newkit', 'task_module', 'task_watch'].forEach(item => {
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

gulp.task('bs-reload', done => {
  notifier.notify({ title: 'Newkit', message: 'Build successfully.' });
  browserSync.reload();
  done();
});

gulp.task('default', gulp.series(
  gulp.parallel('build:vendor', 'build:newkit', 'build:modules'),
  gulp.parallel('serve')
));