var gulp = require('gulp');
var path = require('path');
var templateCache = require('gulp-angular-templatecache');
var config = require('../config');

var notify = require('gulp-notify');
var jade = require('gulp-jade');
var gfilter = require('gulp-filter');
var addsrc = require('gulp-add-src');
var debug = require('gulp-debug');

gulp.task('templates', function() {
    return gulp.src([
            path.resolve(config.BASE_PATH, 'src/**/*.jade')
        ])
        .pipe(debug())
        .pipe(jade({
            pretty: true,
            doctype: 'html'
        })).on('error', notify.onError({
            message: "Error: <%= error.message %>",
            title: "Error compiling jade"
        }))
        .pipe(addsrc(path.resolve(config.BASE_PATH, 'src/!**!/!*.html')))


        .pipe(templateCache('zddz.templates.js', {
            module: 'zddz.templates',
            standalone: true
        }))
        .pipe(gulp.dest(path.resolve(config.BASE_PATH, 'src/js')));
});

