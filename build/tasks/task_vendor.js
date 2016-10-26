const concat = require('gulp-concat');

module.exports = {
  init(gulp) {
    gulp.task('build:vendor.js', () => {
      return gulp.src([
        'node_modules/jquery/dist/jquery.js',
        'node_modules/bootstrap/dist/js/bootstrap.js',
        'node_modules/nprogress/nprogress.js',
        'node_modules/lodash/lodash.js',

        'static/vendor/html2canvas.min.js',
        'static/vendor/neg-feedback.min.js',

        'node_modules/zone.js/dist/zone.js', //min
        'node_modules/rxjs/bundles/Rx.js', //min
        'node_modules/reflect-metadata/Reflect.js',
        'node_modules/@angular/core/bundles/core.umd.js', //min
        'node_modules/@angular/compiler/bundles/compiler.umd.js', //min
        'node_modules/@angular/common/bundles/common.umd.js', //min
        'node_modules/@angular/platform-browser/bundles/platform-browser.umd.js', //min
        'node_modules/@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js', //min
        'node_modules/@angular/router/bundles/router.umd.js', //min
        'node_modules/@angular/forms/bundles/forms.umd.js', //min
        'node_modules/@angular/http/bundles/http.umd.js', //min

        'node_modules/ng2-translate/bundles/index.js'
      ])
        .pipe(concat('vendor.js'))
        .pipe(gulp.dest('./dist/js'));
    });

    gulp.task('build:vendor.css', () => {
      return gulp.src([
        'node_modules/font-awesome/css/font-awesome.css',
        'node_modules/bootstrap/dist/css/bootstrap.css',
        'node_modules/nprogress/nprogress.css',
        'static/nk-style/nk.css',

        'node_modules/@progress/kendo-angular-buttons/dist/npm/css/main.css',
        'node_modules/@progress/kendo-angular-charts/dist/npm/css/main.css',
        'node_modules/@progress/kendo-angular-dialog/dist/npm/css/main.css',
        'node_modules/@progress/kendo-angular-dropdowns/dist/npm/css/main.css',
        'node_modules/@progress/kendo-angular-grid/dist/npm/css/main.css',
        'node_modules/@progress/kendo-angular-inputs/dist/npm/css/main.css',
        'node_modules/@progress/kendo-angular-layout/dist/npm/css/main.css',
        'node_modules/@progress/kendo-angular-popup/dist/npm/css/main.css',
        'node_modules/@progress/kendo-angular-scrollview/dist/npm/css/main.css',
        'node_modules/@progress/kendo-angular-upload/dist/npm/css/main.css'
      ]).pipe(concat('vendor.css'))
        .pipe(gulp.dest('./dist/css'));
    });

    gulp.task('build:vendor.fonts', () => {
      return gulp.src([
        'node_modules/font-awesome/fonts/*.*',
        'node_modules/bootstrap/dist/fonts/*.*'
      ])
        .pipe(gulp.dest('./dist/fonts'));
    });

    gulp.task('build:vendor', gulp.parallel('build:vendor.js', 'build:vendor.css', 'build:vendor.fonts'));
  }
};