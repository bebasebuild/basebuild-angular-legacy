

module.exports = function(options) {

  /**
   * Imports
   */
  var gulp  = require('gulp');
  var mocha = require('gulp-mocha');
  var $     = options.plugins;


  function runTests (argument) {
    return gulp.src(options.specFiles, {read: false})
      .pipe(mocha({reporter: 'nyan'})) .on('error', options.errorHandler('Mocha')); // gulp-mocha needs filepaths so you can't have any plugins before it 
  }

  gulp.task('test', ['scripts'], runTests);

  gulp.task('test:auto', ['watchTests', 'test'], function(){
    return gulp.watch(options.tmp + '/**/*.js', runTests);
  });
}