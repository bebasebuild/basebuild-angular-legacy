'use strict';


var $ = require('gulp-load-plugins')();
var wiredep = require('wiredep');
var concat = require('concat-stream');
var _ = require('lodash');

module.exports = function(options) {
  var gulp  = require(options.modulesData['gulp'].uses);
  var karma = require(options.modulesData['karma'].uses);

  function listFiles(callback) {


    var wiredepOptions = _.extend({}, options.wiredep, {
      dependencies: true,
      devDependencies: true,
      stream: null
    });

    var bowerDeps = wiredep(wiredepOptions);

    var additionalDeps = options.modulesData['unitTests'].addDeps || [];

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
      var karmaModuleData   = options.modulesData['karma'];
      var karmaConfFileName = process.cwd() + '/' + karmaModuleData.configFile;

      karma.server.start({
        configFile:  karmaConfFileName,
        files: files,
        singleRun: testOptions.singleRun,
        autoWatch: !testOptions.singleRun,
        browsers : testOptions.browsers,
        basePath : process.cwd()
      }, function(){ testOptions.done() });
    });
  }

  gulp.task('test', ['scripts'], function(done) {
    var testConfig = _.extend(options.modulesData['unitTests'].testConfig, {done : done});
    runTests(testConfig);
  });

  gulp.task('test:auto', ['watchTests'], function(done) {
    var testAutoConfig = _.extend(options.modulesData['unitTests'].testAutoConfig, {done : done});
    runTests(testAutoConfig);
  });

};
