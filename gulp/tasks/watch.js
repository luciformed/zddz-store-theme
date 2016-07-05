var gulp = require('gulp');
var livereload = require('gulp-livereload');
var path = require('path');
var argv = require('yargs').argv;
var config = require('../config');
var read = require('fs').readFileSync;
var write = require('fs').writeFileSync;
var httpProxy = require('http-proxy');

gulp.task('watch', function () {

    // livereload.listen({
    //     start:true
    // });


    gulp.watch(path.resolve(config.BASE_PATH, 'src/**/*.less'), ['styles']);
    gulp.watch(path.resolve(config.BASE_PATH, 'src/**/*.js'), ['scripts']);
    // gulp.watch(path.resolve(config.BASE_PATH, 'src/**/*.html'), ['templates']);
    // gulp.watch(path.resolve(config.BASE_PATH, 'src/**/*.jade'), ['templates']);
    // gulp.watch(path.resolve(config.BASE_PATH, 'bower.json'), ['bower-files']);
    // gulp.watch(path.resolve(config.BASE_PATH, 'src/**/*.svg'), ['icons']);


});
