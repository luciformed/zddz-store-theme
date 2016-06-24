var config = require('../config');
var gulp = require('gulp');
var path = require('path');
var es = require('event-stream');

gulp.task('copy', function () {

  var contentStream = gulp.src([
      './content/fonts/**',
      './content/img/**',
      './content/videos/**'
    ], {
      base: "./content"
    })
    .pipe(gulp.dest(path.resolve(config.BASE_PATH, 'dist')));

  var copyBootstrapStream = gulp.src([
      './src/bootstrap.js'
    ], {
      base: "./src"
    })
    .pipe(gulp.dest(path.resolve(config.BASE_PATH, 'dist/js')));

  return es.concat(contentStream, copyBootstrapStream);
});


