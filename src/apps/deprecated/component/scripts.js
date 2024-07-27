'use strict';

var gulp = require('gulp');
var browserSync = require('browser-sync');

var _    = require('lodash');
var $    = require('gulp-load-plugins')({
  pattern: ['gulp-*', 'main-bower-files', 'uglify-save-license', 'del']
});


function buildScripts (params) {

  var params  = params         || {};
  var options = params.options || {};
  var dest    = options.componentDest;
  var src     = options.componentSrc + '/**/*.coffee' || options.src + '/app/**/*.coffee';

  return gulp.src(src)
      .pipe($.sourcemaps.init())
      .pipe($.coffeelint())
      .pipe($.coffeelint.reporter())
      .pipe($.coffee()).on('error', options.errorHandler('CoffeeScript'))
      .pipe($.sourcemaps.write())
      .pipe(gulp.dest(dest))
      .pipe($.size());

};

function concatAndMinify(params){

  var params  = params         || {};
  var options = params.options || {};
  var dest    = options.componentDist;
  var src     = [ options.componentDest + '/**/*.js', '!' + dest + "/**/*" ];


  return gulp.src(src)
    .pipe($.concat(options.componentName + '.min.js'))
    .pipe($.uglify({ preserveComments: $.uglifySaveLicense })).on('error', options.errorHandler('Uglify'))
    .pipe(gulp.dest(dest))
    .pipe($.size());
};

function cleanOldScripts (params) {

  var params   = params         || {};
  var options  = params.options || {};
  var done     = params.done    || function(){ console.log('cleanOldScripts: done is not defined!'); };
  var dest     = options.componentDest;
  var src      = [options.componentDest + '/**/*', '!' + options.componentDist, '!' + options.componentDist + '/**/*'];

  $.del(src, done);
};


var Scripts = function(options) {
  gulp.task('scripts:component', function(){
    return buildScripts({options: options});
  });

  gulp.task('uglify:component', ['scripts:component', 'cjsx:component'], function(){
    return concatAndMinify({options: options})
  });

  gulp.task('clean:oldComponentScripts', ['uglify:component'], function(done){
    cleanOldScripts({options: options, done: done});
    // return done();
  });

  return { buildScripts: buildScripts, concatAndMinify: concatAndMinify }
};

module.exports = Scripts
