'use strict';

var gulp = require('gulp');

var $ = require('gulp-load-plugins')({
  pattern: ['gulp-*', 'main-bower-files', 'uglify-save-license', 'del']
});

module.exports = function(options) {

  // Only applies for fonts from bower dependencies
  // Custom fonts are handled by the "other" task
  gulp.task('fonts:component', function () {
    var files = [ options.src + '/assets/fonts/**/*' ].concat($.mainBowerFiles());

    return gulp.src(files)
      .pipe($.filter('**/*.{eot,svg,ttf,woff,woff2}'))
      .pipe($.flatten())
      .pipe(gulp.dest(options.componentDist + '/assets/fonts/'));
  });

  gulp.task('images:component', function () {
    var files = [ options.src + '/assets/images/**/*' ];

    return gulp.src(files)
      .pipe($.flatten())
      .pipe(gulp.dest(options.componentDist + '/assets/images/'));
  });

  gulp.task('other:component', function () {
    return gulp.src([
      options.componentSrc + '/**/*',
      '!' + options.componentSrc + '/**/*.{html,css,js,scss,coffee,cjsx}'
    ])
      .pipe(gulp.dest(options.componentDest + '/'));
  });

  gulp.task('clean:component', function (done) {
    $.del([options.componentDest + '/'], done);
  });

  gulp.task('build:component', [
    'fonts:component',
    'images:component',
    'other:component',
    'scripts:component',
    'uglify:component',
    'styles:component',
    'cjsx:component',
    'clean:oldComponentScripts'
  ]);
};
