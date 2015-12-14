'use strict';

var browserSync   = require('browser-sync');
var path          = require('path');
var watch         = require('gulp-watch');
var scriptsModule = null;
var serverConfig  = null;
var gulp          = null;
var del           = require('del');

var watchFolderOptions  = {
  events: ['addDir', 'unlinkDir'],
  read: false
}

function isOnlyChange(file) {
  return file.event === 'change';
}

function removed(file) {
  return file.event === 'unlink';
}

function removeFile(options, event){
  var fullDest  = options.tmp + '/serve/' + path.relative(options.src, event.path).replace(/\.\.\//g, '');
  del([fullDest.replace(/\.[^\.]+$/, '.*')]);
}

function watchFiles (options){

  watch([options.src + '/*.html', 'bower.json'], function(event){
    gulp.start('inject');

  });

  watch([options.src + '/app/**'], watchFolderOptions, function(event){
    if (event.event === 'unlinkDir'){
      var fullDest  = options.tmp + '/serve/' + path.relative(options.src, event.path).replace(/\.\.\//g, '');
      del([fullDest + "/**"]);
    }

    gulp.start('inject');
  });

  watch([
    options.src + '/app/**/*.css',
    options.src + '/app/**/*.scss'
  ], function(event) {
    if(isOnlyChange(event)) {
      gulp.start('styles');
    } else if (removed(event)){
      removeFile(options, event)

    }else{
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
      scriptsModule.buildScripts({ src: event.path, dest: fullDest, buildOptions: options });
    } else if (removed(event)){
      removeFile(options, event);

    }else{
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
      scriptsModule.buildCJSX({ src: event.path, dest: fullDest, buildOptions: options });
    } else if (removed(event)){
      removeFile(options, event);

    }else{
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
