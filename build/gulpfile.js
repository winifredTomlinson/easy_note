require('shelljs/global');
const gulp = require('gulp4');
const concat = require('gulp-concat');
const browserSync = require('browser-sync');
const historyApiFallback = require('connect-history-api-fallback');
const notifier = require('node-notifier');
//'', 'task_watch', 'task_release'
['task_vendor', 'task_newkit', 'task_module'].forEach(item => {
  require(`./tasks/${item}`)(gulp);
});

gulp.task('clean', done => {
  rm('-rf', 'dist');
  done();
});

gulp.task('serve', done => {
  browserSync.init({
    server: {
      baseDir: './'
    },
    middleware: [historyApiFallback()],
    ghostMode: false,
    port: 10000
  });
  done();
});

gulp.task('build', gulp.series(
  'clean',
  gulp.parallel('build:vendor', 'build:newkit', 'build:modules'),
  'serve'
));


gulp.task('bs-reload', done => {
  notifier.notify({ title: 'Newkit', message: 'Build successfully.' });
  browserSync.reload();
  done();
});

gulp.task('default', gulp.series(
  // gulp.parallel('build:newkit', 'build:modules'),
  // gulp.parallel('serve')
));