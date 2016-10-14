const gulp = require('gulp');
const concat = require('gulp-concat');
const ts = require('gulp-typescript');
const inlineNg2Template = require('gulp-inline-ng2-template');
const embedTemplates = require('gulp-angular-embed-templates');

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

gulp.task('vendor', () => {
  return gulp.src([
    node_modules / lodash / lodash.js,
    node_modules / zone.js / dist / zone.js,
    node_modules / reflect - metadata / Reflect.js,
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
    // 'node_modules/ui-router-ng2/_bundles/ui-router-ng2.js'
  ])
    .pipe(concat('vendor.js'))
    // .pipe(uglify())
    .pipe(gulp.dest('./dist'));
});

gulp.task('default', gulp.series('vendor', 'nk-core', 'nk-shell'));