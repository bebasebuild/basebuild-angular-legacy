
var $ = require('gulp-load-plugins')({
  pattern: ['gulp-*', 'main-bower-files', 'uglify-save-license', 'del', '!gulp']
});

module.exports = function (options) {
  var docsData = options.modulesData['docs'];
  var gulp     = require(options.modulesData['gulp'].uses);
  var shelljs  = require('shelljs');

  gulp.task('docs', ['scripts', 'clean:docs'], function(done){
    var grocArgs = 'groc --glob ' + docsData.files.join(' ') + ' --out ' + docsData.out;
    shelljs.exec(grocArgs, done);
  });

  gulp.task('clean:docs', function (done) {
    $.del(docsData.out, done);
  });

}