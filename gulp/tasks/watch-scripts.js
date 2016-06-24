var gulp = require('gulp');
var webpack = require("webpack");
var webpackConfig = require('../helpers/webpack.config.js');
var gutil = require('gulp-util');
var livereload = require('gulp-livereload');

gulp.task("watch-scripts", function (callback) {
    webpackConfig.watch = true;

    // run webpack
    webpack(webpackConfig, function (err, stats) {
        if (err) throw new gutil.PluginError("webpack", err);
        /*gutil.log("[webpack]", stats.toString({
         // output options
         }));*/
        gutil.log(stats.compilation.errors.toString());
        gutil.log('"scripts" Finished after:' + (stats.endTime - stats.startTime) + 'ms');
        //Do not call callback here to keep it running.
        livereload.reload()
    });
});
