const fs = require('fs');
const path = require('path');

module.exports = {
  init(gulp) {
    gulp.task('watch:modules', done => {
      fs.readdirSync('./src/modules')
        .forEach(moduleName => {
          let stats = fs.statSync(`./src/modules/${moduleName}`);
          if (stats.isDirectory()) {
            gulp.watch(`./src/modules/${moduleName}/**/*.*`, gulp.series(`build:modules.${moduleName}`, 'bs-reload'));
          }
        });
      done();
    });

    gulp.task('watch:newkit', done => {
      gulp.watch(`./src/newkit/nk-core/**/*.*`, gulp.series(`build:nk-core`, 'bs-reload'));
      gulp.watch(`./src/newkit/nk-shell/**/*.*`, gulp.series(`build:nk-shell`, 'bs-reload'));
      done();
    });

    gulp.task('watch', gulp.parallel('watch:modules', 'watch:newkit'));
  }
};