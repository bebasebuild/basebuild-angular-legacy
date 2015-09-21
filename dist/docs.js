
var $ = require('gulp-load-plugins')({
  pattern: ['gulp-*', 'main-bower-files', 'uglify-save-license', 'del', '!gulp']
});

var chalk = require('chalk');

module.exports = function (options) {
  var docsData = options.modulesData['docs'];
  var gulp     = require(options.modulesData['gulp'].uses);
  var shelljs  = require('shelljs');

  gulp.task('docs', ['scripts', 'clean:docs'], function(done){
    if(shelljs.which('groc')){
      var grocArgs = 'groc --glob ' + docsData.files.join(' ') + ' --out ' + docsData.out;
      shelljs.exec(grocArgs, done);
    } else {
      var errorMessage = chalk.red('ERROR: Groc is not installed as a global dependencie, please execute: ') + chalk.underline('npm install -g groc');
      console.log(errorMessage);
    }

  });

  gulp.task('clean:docs', function (done) {
    $.del(docsData.out, done);
  });

}