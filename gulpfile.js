const gulp = require('gulp');
const concat = require('gulp-concat');
const tsc = require('gulp-typescript');
const embedTemplates = require('gulp-angular-embed-templates');

gulp.task('nk-core', () => {
  var tsResult = gulp.src('./src/newkit/nk-core/**/*.ts')
    .pipe(embedTemplates()) // inline templates
    .pipe(tsc.createProject('tsconfig.json', {
      outFile: 'nk-core.js'
    })());

  return tsResult.js
    .pipe(gulp.dest('dist'));
});

gulp.task('nk-shell', () => {
  var tsResult = gulp.src('./src/newkit/nk-shell/**/*.ts')
    .pipe(embedTemplates()) // inline templates
    .pipe(tsc.createProject('tsconfig.json', {
      outFile: 'nk-shell.js'
    })());

  return tsResult.js
    .pipe(gulp.dest('dist'));
});

gulp.task('vendor', () => {
  return gulp.src([
    "node_modules/lodash/lodash.js",
    "node_modules/zone.js/dist/zone.js",
    "node_modules/reflect-metadata/Reflect.js",
    'node_modules/systemjs/dist/system.src.js',
    'node_modules/rxjs/bundles/Rx.js',
    'node_modules/@angular/core/bundles/core.umd.js',
    'node_modules/@angular/common/bundles/common.umd.js',
    'node_modules/@angular/compiler/bundles/compiler.umd.js',
    'node_modules/@angular/platform-browser/bundles/platform-browser.umd.js',
    'node_modules/@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js',
    'node_modules/@angular/forms/bundles/forms.umd.js',
    'node_modules/@angular/http/bundles/http.umd.js',
    'node_modules/@angular/router/bundles/router.umd.js',
    'node_modules/ui-router-ng2/_bundles/ui-router-ng2.js'
  ])
    .pipe(concat('vendor.js'))
    // .pipe(uglify())
    .pipe(gulp.dest('./dist'));
});

gulp.task('default', gulp.series('vendor', 'nk-core', 'nk-shell'));