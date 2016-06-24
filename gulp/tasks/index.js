var gulp = require('gulp');
var path = require('path');
var argv = require('yargs').argv;
var jade = require('gulp-jade');
var config = require('../config');

gulp.task('index', function () {

    return gulp.src(path.resolve(config.BASE_PATH, 'src/index.jade'))
        .pipe(jade({
            pretty: true,
            doctype: 'html',
            locals: {
                API_HOST: argv.apiHost || config.defaultApiHost
            }
        }))
        .pipe(gulp.dest(path.resolve(config.BASE_PATH, 'dist')));

});
