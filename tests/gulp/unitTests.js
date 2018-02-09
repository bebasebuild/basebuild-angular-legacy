

module.exports = function(options) {

  /**
   * Imports
   */
  var gulp      = require('gulp');
  var mocha     = require('gulp-mocha');
  var istanbul  = require('gulp-istanbul');


  function runTests (argument) {
    return gulp.src(options.specFiles, {read: false})
      .pipe(mocha({reporter: 'nyan'})).on('error', options.errorHandler('Mocha')) // gulp-mocha needs filepaths so you can't have any plugins before it 
      .pipe(istanbul.writeReports());
  }

  function setupCoverage () {
    return gulp.src('../dist/**/*.js')
      .pipe(istanbul())
      .pipe(istanbul.hookRequire()).on('error', options.errorHandler('Coverage'));
  }

  gulp.task('setup-coverage', [], setupCoverage);

  gulp.task('test', ['scripts', 'setup-coverage'], runTests);

  gulp.task('test:auto', ['watchTests', 'test', 'setup-coverage'], function(){
    return gulp.watch(options.tmp + '/**/*.js', runTests);
  });
 
}
