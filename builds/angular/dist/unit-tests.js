'use strict';

var gulp = require('gulp');

var $ = require('gulp-load-plugins')();

var wiredep = require('wiredep');
var karma = require('karma');
var concat = require('concat-stream');
var _ = require('lodash');

module.exports = function(options) {
  function listFiles(callback) {
    var wiredepOptions = _.extend({}, options.wiredep, {
      dependencies: true,
      devDependencies: true
    });
    var bowerDeps = wiredep(wiredepOptions);

    var additionalDeps = [
      'bower_components/angular-input-masks/angular-input-masks-standalone.js'
    ]

    var specFiles = options.specFiles || [];

    var htmlFiles = [
      options.src + '/**/*.html'
    ];

    var srcFiles = [
      options.tmp + '/serve/app/**/*.js'
    ].concat(specFiles.map(function(file) {
      return '!' + file;
    }));


    gulp.src(srcFiles)
      .pipe($.angularFilesort()).on('error', options.errorHandler('AngularFilesort'))
      .pipe(concat(function(files) {
        callback(bowerDeps.js
          .concat(additionalDeps)
          .concat(_.pluck(files, 'path'))
          .concat(htmlFiles)
          .concat(specFiles));
      }));
  }

  function runTests (testOptions) {
    listFiles(function(files) {
      karma.server.start({
        configFile: __dirname + '/../karma.conf.js',
        files: files,
        singleRun: testOptions.singleRun,
        autoWatch: !testOptions.singleRun,
        browsers : testOptions.browsers
      }, function() { testOptions.done(); });
    });
  }

  gulp.task('test', ['scripts'], function(done) {
    runTests({
      singleRun : true,
      done      : done,
      browsers  : ['PhantomJS']
    });
  });

  gulp.task('test:auto', ['watchTests'], function(done) {
    runTests({
      singleRun : false,
      done      : done,
      browsers  : ['Chrome']
    });
  });

};
