var gulp = require('gulp');
var runSequence = require('run-sequence');
var requireDir = require('require-dir');

// Pulling in all tasks from the tasks folder
requireDir('./gulp/tasks', {
  recurse: true
});

gulp.task('build', function(callback) {



  runSequence('copy', 'templates', 'icons', 'scripts', [
    'styles',
    'bower-files',
    'index'
  ], callback);
});

