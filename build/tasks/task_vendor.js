const concat = require('gulp-concat');
const assets = require('./../assets.json');

module.exports = (gulp, params) => {
  gulp.task('build:vendor.js', () => {
    return gulp.src(assets['vendor.js'])
      .pipe(concat('vendor.js', {newLine: ';\n'}))
      .pipe(gulp.dest('./dist/assets/js'));
  });

  gulp.task('build:vendor.css', () => {
    return gulp.src(assets['vendor.css'])
      .pipe(concat('vendor.css', {newLine: '\n\n'}))
      .pipe(gulp.dest('./dist/assets/css'));
  });

  gulp.task('build:vendor.fonts', () => {
    return gulp.src(assets['vendor.fonts'])
      .pipe(gulp.dest('./dist/assets/fonts'));
  });

  gulp.task('build:vendor.static', () => {
    return gulp.src(assets['vendor.static'])
      .pipe(gulp.dest('./dist/assets/js'));
  });

  gulp.task('build:vendor', gulp.parallel('build:vendor.js', 'build:vendor.css', 'build:vendor.fonts', 'build:vendor.static'));
};
