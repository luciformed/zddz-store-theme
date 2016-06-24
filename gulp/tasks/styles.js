var gulp = require('gulp');
var livereload = require('gulp-livereload');
var sourcemaps = require('gulp-sourcemaps');
var less = require('gulp-less');
var notify = require('gulp-notify');
var autoprefixer = require('gulp-autoprefixer');
var config = require('../config');
var path = require('path');

gulp.task('styles', function () {
    return gulp.src(path.resolve(config.BASE_PATH, 'src/styles/zddz.less'))
        .pipe(sourcemaps.init())
        .pipe(less())
        .on("error", notify.onError({
            message: "Error: <%= error.message %>",
            title: "Error compiling LESS"
        }))
        .pipe(autoprefixer({
            cascade: false
        }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(path.resolve(config.BASE_PATH, 'assets/')))
        .pipe(livereload())
});
