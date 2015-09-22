'use strict';

var $ = require('gulp-load-plugins')();

var wiredep = require('wiredep').stream;

module.exports = function(options) {
  var gulp         = require(options.modulesData['gulp'].uses);
  var serverConfig = options.modulesData['server'];

  gulp.task('inject', ['scripts', 'styles'], function () {
    var injectStyles = gulp.src([
      options.tmp + '/serve/app/**/*.css',
      '!' + options.tmp + '/serve/app/vendor.css'
    ], { read: false });


    var injectPaths   = [
      '{' + options.src + ',' + options.tmp + '/serve}/app/**/*.js',
      '!{' + options.src + ',' + options.tmp + '/serve}/app/**/*spec.js',
      '!{' + options.src + ',' + options.tmp + '/serve}/app/**/*mock.js',
      '!{' + options.src + ',' + options.tmp + '/serve}/app/**/*.env.js'
    ];
    var injectScripts = gulp.src(injectPaths).pipe($.angularFilesort()).on('error', options.errorHandler('AngularFilesort'));

    // console.log("injectScripts: ", injectScripts);

    var injectOptions = {
      ignorePath: [options.src, options.tmp + '/serve'],
      addRootSlash: false
    };

    return gulp.src(options.src + '/*.html')
      .pipe($.inject(injectStyles, injectOptions))
      .pipe($.inject(injectScripts, injectOptions))
      .pipe(wiredep(options.wiredep))
      .pipe( $.if(!serverConfig.isEnabled, $.replace('../' + options.bowerComponents, options.bowerComponents)) )
      .pipe(gulp.dest(options.tmp + '/serve'));

  });
};
