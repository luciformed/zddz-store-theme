var path = require('path');
var webpack = require('webpack');
var config = require('../config');
var gutil = require('gulp-util');

module.exports = {

    entry: {
       "zddz.js": path.resolve(config.BASE_PATH, 'src/js/zddz.js')
    },

    output: {
        path: path.resolve(config.BASE_PATH, 'assets'),
        filename: 'zddz.js'
    },

    externals: {
        'angular': 'angular'
    },

    watchOption: {
        aggregateTimeout: 100
    },

    devtool: 'source-map',

    module: {
        loaders:  [
            // the 'transform-runtime' plugin tells babel to require the runtime
            // instead of inlining it.
            {
                test: /\.jsx?$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015'],
                    compact: true
                }
            }
        ]
    },
    plugins: gutil.env.minify === 'true' ? [
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: false,
            mangle: false
        })
    ] : [],

    resolve: {
        root: [path.join(config.BASE_PATH, "bower_components")]
    }

};
