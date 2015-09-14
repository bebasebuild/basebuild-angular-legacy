'use strict';

var gulp          = require('gulp');
var browserSync   = require('browser-sync');
var path          = require('path');
var scriptsModule = null

function isOnlyChange(event) {
  return event.type === 'changed';
}

function watchFiles (options){
  gulp.watch([options.src + '/*.html', 'bower.json'], ['inject']);

  gulp.watch([
    options.src + '/app/**/*.css',
    options.src + '/app/**/*.scss'
  ], function(event) {
    if(isOnlyChange(event)) {
      gulp.start('styles');
    } else {
      gulp.start('inject');
    }
  });

  gulp.watch([
    options.src + '/app/**/*.js',
    options.src + '/app/**/*.coffee'
  ], function(event) {
    if(isOnlyChange(event)) {
      var fullDest  = options.tmp + '/serve/' + path.relative(options.src, event.path).replace(/\.\.\//g, '');
      fullDest      = path.dirname( fullDest );
      scriptsModule.buildScripts({ src: event.path, dest: fullDest, options: options })
    } else {
      gulp.start('inject');
    }
  });

  gulp.watch(options.src + '/app/**/*.html', function(event) {
    browserSync.reload(event.path);
  });

  gulp.watch([
    options.src + '/app/**/*.cjsx',
  ], function(event) {
    if(isOnlyChange(event)) {
      var fullDest  = options.tmp + '/serve/' + path.relative(options.src, event.path).replace(/\.\.\//g, '');
      fullDest      = path.dirname( fullDest );
      scriptsModule.buildCJSX({ src: event.path, dest: fullDest, options: options })
    } else {
      gulp.start('inject');
    }
  });
}

module.exports = function(options) {
  scriptsModule = require('./scripts.js')(options);

  gulp.task('watch', ['inject'], function(){
    watchFiles(options);
  });

  gulp.task('watchTests', ['scripts', 'cjsx'],  function(){
    watchFiles(options);
  });
};
