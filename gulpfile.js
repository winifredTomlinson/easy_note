const gulp = require('gulp');
const concat = require('gulp-concat');
const tsc = require('gulp-typescript');
const embedTemplates = require('gulp-angular-embed-templates');

let tsProject = tsc.createProject('tsconfig.json', {
  outFile: 'app.js'
});

gulp.task('tscompile', () => {
  var tsResult = gulp.src('app/**/*.ts')
    .pipe(embedTemplates()) // inline templates
    .pipe(tsProject());

  return tsResult.js
    .pipe(gulp.dest('dist'));
});

gulp.task('vendor-bundle', () => {
  return gulp.src([
    "node_modules/zone.js/dist/zone.js",
    "node_modules/reflect-metadata/Reflect.js",
    'node_modules/systemjs/dist/system.src.js',
    'node_modules/rxjs/bundles/Rx.js',
    'node_modules/rxjs',
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
    .pipe(gulp.dest('./dist'));
});

gulp.task('default', gulp.series('vendor-bundle', 'tscompile'));