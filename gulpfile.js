const gulp = require('gulp');
const concat = require('gulp-concat');
const ts = require('gulp-typescript');
const inlineNg2Template = require('gulp-inline-ng2-template');
const embedTemplates = require('gulp-angular-embed-templates');
const browserSync = require('browser-sync');
const historyApiFallback = require('connect-history-api-fallback');
const notifier = require('node-notifier');

let tsOption = {
  target: 'es5',
  module: 'system',
  declaration: false,
  noLib: false,
  moduleResolution: 'node',
  noImplicitAny: false,
  removeComments: true,
  preserveConstEnums: true,
  experimentalDecorators: true,
  emitDecoratorMetadata: true,
  lib: [
    'es2015',
    'dom'
  ]
};

gulp.task('nk-core', () => {
  let nkCoreOpt = Object.assign({}, tsOption, {
    outFile: 'nk-core.js'
  });
  return gulp.src([
    './src/declare.d.ts',
    './src/newkit/nk-core/**/*.ts'
  ])
    .pipe(inlineNg2Template({
      useRelativePaths: true
    })) // inline templates
    .pipe(ts(nkCoreOpt))
    .pipe(gulp.dest('dist'));
});

gulp.task('nk-shell', () => {
  let nkShellOpt = Object.assign({}, tsOption, {
    outFile: 'nk-shell.js'
  });
  return gulp.src([
    './src/declare.d.ts',
    './src/newkit/nk-shell/**/*.ts'
  ])
    .pipe(inlineNg2Template({
      useRelativePaths: true
    })) // inline templates
    .pipe(ts(nkShellOpt))
    .pipe(gulp.dest('dist'));
});

gulp.task('static.css', () => {
  return gulp.src([
    'node_modules/font-awesome/css/font-awesome.css',
    'node_modules/bootstrap/dist/css/bootstrap.css',
    'node_modules/nprogress/nprogress.css'
  ]).pipe(concat('vendor.css'))
    .pipe(gulp.dest('./dist/static/css'));
});

gulp.task('static.fonts', () => {
  return gulp.src([
    'node_modules/font-awesome/fonts/*.*',
    'node_modules/bootstrap/dist/fonts/*.*'
  ])
    .pipe(gulp.dest('./dist/static/fonts'));
});

gulp.task('static.js', () => {
  return gulp.src([
    'node_modules/jquery/dist/jquery.js',
    'node_modules/bootstrap/dist/js/bootstrap.js',
    'node_modules/nprogress/nprogress.js',
    'node_modules/lodash/lodash.js',
    'node_modules/zone.js/dist/zone.js',
    'node_modules/reflect-metadata/Reflect.js',
    'node_modules/systemjs/dist/system.src.js',
    'node_modules/rxjs/bundles/Rx.js',
    'node_modules/@angular/core/bundles/core.umd.js',
    'node_modules/@angular/common/bundles/common.umd.js',
    'node_modules/@angular/compiler/bundles/compiler.umd.js',
    'node_modules/@angular/platform-browser/bundles/platform-browser.umd.js',
    'node_modules/@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js',
    'node_modules/@angular/forms/bundles/forms.umd.js',
    'node_modules/@angular/http/bundles/http.umd.js',
    'node_modules/@angular/router/bundles/router.umd.js'
  ])
    .pipe(concat('vendor.js'))
    // .pipe(uglify())
    .pipe(gulp.dest('./dist/static/js'));
});

gulp.task('static', gulp.parallel('static.js', 'static.css', 'static.fonts'));

gulp.task('serve', () =>
  browserSync({
    server: {
      baseDir: './'
    },
    middleware: [historyApiFallback()],
    ghostMode: false,
    port: 8888
  })
);

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
    notifier.notify({ title: 'Newkit', message: 'Start build and reload...' });
    let tasks = [];
    if (path.indexOf('nk-core') >= 0) {
      tasks.push('nk-core');
    } else if (path.indexOf('nk-shell') >= 0) {
      tasks.push('nk-shell');
    }
    gulp.series(...tasks, 'bs-reload')();
  });
  done();
});

gulp.task('bs-reload', done => {
  notifier.notify({ title: 'Newkit', message: 'Build successfully.' });
  browserSync.reload();
  done();
});

gulp.task('default', gulp.series(
  gulp.parallel('static', 'nk-core', 'nk-shell'),
  gulp.parallel('serve', 'watch')
));