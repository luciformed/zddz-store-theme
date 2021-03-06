/*Sticks svg source into svgCache, based on gulp-angular-templatecache */

var es = require('event-stream');
var path = require('path');
var gutil = require('gulp-util');
var concat = require('gulp-concat');
var header = require('gulp-header');
var footer = require('gulp-footer');
var htmlJsStr = require('js-string-escape');

function svgCache(root, base, urlMap) {
  if (base && base.substr(-1) !== path.sep) {
    base += '/';
  }

  var mapFunction = urlMap || function(file,root,base){return path.join(root, file.path.replace(base || file.base, ''))};

  return es.map(function(file, callback) {
    var template = 'svgCache.put("<%= url %>","<%= contents %>");';
    var url = mapFunction(file,root,base);

    if (process.platform === 'win32') {
      url = url.replace(/\\/g, '/');
    }

    file.contents = new Buffer(gutil.template(template, {
      url: url,
      contents: htmlJsStr(file.contents),
      file: file
    }));

    callback(null, file);
  });
}

module.exports = function(filename, options) {
  if (typeof filename === 'string') {
    options = options || {};
  } else {
    options = filename || {};
    filename = options.filename || 'svgs.js';
  }

  var templateHeader = 'angular.module("<%= module %>"<%= standalone %>).run(["svgCache", function(svgCache) {';
  var templateFooter = '}]);';

  return es.pipeline(
    svgCache(options.root || '', options.base, options.urlMap),
    concat(filename),
    header(templateHeader, {
      module: options.module || 'svgs',
      standalone: options.standalone ? ', []' : ''
    }),
    footer(templateFooter)
  );
};
