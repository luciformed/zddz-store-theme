var gulp = require('gulp');
var config = require('../config');
var bowerFiles = require('main-bower-files');
var gfilter = require('gulp-filter');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');
var debug = require('gulp-debug');
var uglify = require('gulp-uglify');
var isMinify = require('../helpers/production-helper');
var es = require('event-stream');


gulp.task('bower-files', function () {
    var jsFilter = gfilter('**/*.js');
    var cssFilter = gfilter('**/*.css');

  var jsVendorStream = gulp.src(bowerFiles(), {
            base: './bower_components'
        })
        .pipe(debug())
        .pipe(jsFilter)
        .pipe(sourcemaps.init())
        .pipe(concat('vendor.js'))
        .pipe(isMinify(uglify))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('dist/js'));


  var cssVendorStream = gulp.src(bowerFiles(), {
      base: './bower_components'
    })
        .pipe(cssFilter)
        .pipe(concat('vendor.css'))
        .pipe(gulp.dest('dist/css'));


  return es.concat(jsVendorStream, cssVendorStream);

});



