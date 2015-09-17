'use strict';

var browserSync = require('browser-sync');

var $    = require('gulp-load-plugins')();
var _    = require('lodash');
var cjsx = require('gulp-cjsx');


function buildScripts (params) {
  var params  = params         || {};
  var options = params.buildOptions || {};
  var gulp    = require(options.modulesData['gulp'].uses);
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

function buildCJSX (params) {
  var params  = params              || {};
  var options = params.buildOptions || {};
  var gulp    = require(options.modulesData['gulp'].uses);
  var dest    = params.dest    || options.tmp + '/serve/app';
  var src     = params.src     || options.src + '/app/**/*.cjsx';

  return gulp.src(src)
    .pipe(cjsx({bare: true}).on('error', options.errorHandler('CoffeeScriptX')))
    .pipe(gulp.dest(dest))
    .pipe(browserSync.reload({ stream: true }))
    .pipe($.size());
}


var Scripts = function(buildOptions) {

  var gulp    = require(buildOptions.modulesData['gulp'].uses);

  gulp.task('scripts', function(){
    return buildScripts({buildOptions: buildOptions});
  });

  gulp.task('cjsx', function() {
    return buildCJSX({buildOptions: buildOptions})
  });

  var exports = {
    buildScripts: buildScripts,
    buildCJSX   : buildCJSX
  };

  return exports;
};

module.exports = Scripts;
