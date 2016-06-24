var gutil = require('gulp-util');

//Use gulp build --env=prod to set gutil.env.env value.
module.exports = function isMinify(task) {
    return gutil.env.minify === 'true'
        ? task()
        : gutil.noop();
};

