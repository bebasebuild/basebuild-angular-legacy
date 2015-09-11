'use strict';

var gulp = require('gulp');
var browserSync = require('browser-sync');

var $    = require('gulp-load-plugins')();
var _    = require('lodash');


function buildScripts (params) {

  var params  = params         || {};
  var options = params.options || {};
  var dest    = params.dest    || options.tmp + '/serve/app';
  var src     = params.src     || options.src + '/app/**/*.coffee';

  return gulp.src(src)
      .pipe($.sourcemaps.init())
      .pipe($.coffeelint())
      .pipe($.coffeelint.reporter())
      .pipe($.coffee()).on('error', options.errorHandler('CoffeeScript'))
      .pipe($.sourcemaps.write())
      .pipe(gulp.dest(dest))
      .pipe(browserSync.reload({ stream: true }))
      .pipe($.size());

}


var Scripts = function(options) {
  gulp.task('scripts', function(){
    return buildScripts({options: options});
  });

  return { buildScripts: buildScripts }
};

module.exports = Scripts
