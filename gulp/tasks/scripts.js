var gulp = require('gulp');
var webpack = require("webpack");
var webpackConfig = require('../helpers/webpack.config.js');
var gutil = require('gulp-util');


gulp.task("scripts", function (callback) {
    // run webpack
    webpack(webpackConfig, function (err, stats) {
        if (err) throw new gutil.PluginError("webpack", err);
        gutil.log("[webpack]", stats.toString({
            // output options
        }));
        callback();
    });
});
