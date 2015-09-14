'use strict';

var gulp = require('gulp');
var cjsx = require('gulp-cjsx');
var $ = require('gulp-load-plugins')();

module.exports = function(options){
  gulp.task('cjsx:component', function() {
    return gulp.src(options.componentSrc + '/**/*.cjsx')
      .pipe(cjsx({bare: true}).on('error', options.errorHandler('CoffeeScript')))
      .pipe(gulp.dest(options.componentDest))
      .pipe($.size());
  });
};