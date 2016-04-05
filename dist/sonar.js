'use strict';

module.exports = function(options){

  var $ = options.plugins;

  var gulp  = require(options.modulesData.gulp.uses);

  gulp.task('sonar', ['test'], function(){

    // gulp source doesn't matter, all files are referenced in options object above
    return gulp.src('thisFileDoesNotExist.js', { read: false })
      .pipe($.sonar({sonar: options.modulesData['sonar']}))
      .on('error', $.util.log);

  });

}