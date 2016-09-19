var gulp = require('gulp');
var livereload = require('gulp-livereload');
var path = require('path');
var argv = require('yargs').argv;
var config = require('../config');
var read = require('fs').readFileSync;
var write = require('fs').writeFileSync;
var httpProxy = require('http-proxy');

gulp.task('watch', function() {

  livereload.listen({
    start: true,
    debounceDelay: 2000,
    wait: 2000
  });


  gulp.watch(path.resolve(config.BASE_PATH, 'src/**/*.less'), ['styles']);
  gulp.watch(path.resolve(config.BASE_PATH, 'src/**/*.js'), ['scripts']);
  gulp.watch(path.resolve(config.BASE_PATH, 'src/**/*.jade'), ['templates']);

  gulp.watch(path.resolve(config.BASE_PATH, 'templates/**/*.liquid')).on('change', livereload.changed);
  gulp.watch(path.resolve(config.BASE_PATH, 'snippets/**/*.liquid')).on('change', livereload.changed);
  // gulp.watch(path.resolve(config.BASE_PATH, 'bower.json'), ['bower-files']);
  // gulp.watch(path.resolve(config.BASE_PATH, 'src/**/*.svg'), ['icons']);
  //
  //

  var proxyConfig = {
    target: {
      host: '127.0.0.1',
      port: 35729
    },
    ssl: {
      key: read('./gulp/tasks/certs/livereload.key', 'utf8'),
      cert: read('./gulp/tasks/certs/livereload.crt', 'utf8')
    },
    secure: true,
    ws: true
  };

  var pathToIndex = './layout/theme.liquid';
  var indexFile = read(pathToIndex, 'utf8');
  var pattern = /<script.*?src="(https:\/\/localhost:3232\/livereload\.js\?snipver=1)"/;
  var hasProxyScript = pattern.test(indexFile);

  console.log('hasProxyScript', hasProxyScript);

  if (!hasProxyScript) {
    write(pathToIndex, indexFile + '<script src="https://localhost:3232/livereload.js?snipver=1"></script>')
  }

  var proxyServer = httpProxy
    .createServer(proxyConfig)
    .listen(3232, function() {
      console.log('proxy started on 3232')
    });


});

// gulp.task('just-reload', function() {
//     return livereload.reload();
// });
