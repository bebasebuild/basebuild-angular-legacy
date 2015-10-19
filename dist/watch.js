'use strict';

var browserSync   = require('browser-sync');
var path          = require('path');
var watch          = require('gulp-watch');
var scriptsModule = null;
var serverConfig  = null;
var gulp          = null;

function isOnlyChange(file) {
  return file.event === 'change';
}

function watchFiles (options){
  watch([options.src + '/*.html', 'bower.json'], function(){
    gulp.start('inject');
  });


  watch([
    options.src + '/app/**/*.css',
    options.src + '/app/**/*.scss'
  ], function(event) {
    if(isOnlyChange(event)) {
      gulp.start('styles');
    } else {
      gulp.start('inject');
    }
  });

  watch([
    options.src + '/app/**/*.js',
    options.src + '/app/**/*.coffee'
  ], function(event) {
    if(isOnlyChange(event)) {
      var fullDest  = options.tmp + '/serve/' + path.relative(options.src, event.path).replace(/\.\.\//g, '');
      fullDest      = path.dirname( fullDest );
      scriptsModule.buildScripts({ src: event.path, dest: fullDest, buildOptions: options })
    } else {
      gulp.start('inject');
    }
  });

  watch(options.src + '/app/**/*.html', function(event) {
    if(serverConfig.isEnabled){
      browserSync.reload(event.path);
    } else {
      gulp.start('templates:tmp');
    }
  });

  watch([
    options.src + '/app/**/*.cjsx',
  ], function(event) {
    if(isOnlyChange(event)) {
      var fullDest  = options.tmp + '/serve/' + path.relative(options.src, event.path).replace(/\.\.\//g, '');
      fullDest      = path.dirname( fullDest );
      scriptsModule.buildCJSX({ src: event.path, dest: fullDest, buildOptions: options })
    } else {
      gulp.start('inject');
    }
  });
}

module.exports = function(options) {

  scriptsModule = require(options.modulesData['scripts'].uses)(options);
  gulp          = require(options.modulesData['gulp'].uses);
  serverConfig  = options.modulesData['server'];
  var watchDeps = ['inject'];

  if(!serverConfig.isEnabled){
    watchDeps = watchDeps.concat(['bower:tmp', 'fonts:tmp', 'other:tmp', 'templates:tmp', 'copyEnviroments:tmp']);
  };

  gulp.task('watch', watchDeps , function(){
    watchFiles(options);
  });

  gulp.task('watchTests', ['scripts', 'cjsx'],  function(){
    watchFiles(options);
  });
};
