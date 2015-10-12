'use strict';


var $ = require('gulp-load-plugins')();

module.exports = function(options){

  var gulp  = require(options.modulesData.gulp.uses);

  gulp.task('sonar', ['test'], function(){

    // gulp source doesn't matter, all files are referenced in options object above
    return gulp.src('thisFileDoesNotExist.js', { read: false })
      .pipe($.sonar(options.modulesData))
      .on('error', $.util.log);

  });

}