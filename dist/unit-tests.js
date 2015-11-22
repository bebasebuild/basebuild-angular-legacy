'use strict';


var $ = require('gulp-load-plugins')();
var wiredep = require('wiredep');
var concat = require('concat-stream');
var _ = require('lodash');
var chalk = require('chalk');

module.exports = function(options) {
  var gulp  = require(options.modulesData['gulp'].uses);
  var karma = require(options.modulesData['karma'].uses);
  var baseBuildUtils = require(options.modulesData['utils'].uses)(options);

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

  function runTests (testOptions, options) {
    listFiles(function(files) {

      var karmaModuleData   = options.modulesData['karma'];
      var karmaConfFileName = process.cwd() + '/' + karmaModuleData.configFile;
      var server            = null;
      var karmaOptions      = _.extend({
        configFile :  karmaConfFileName,
        files      : files,
        autoWatch  : !testOptions.singleRun,
        basePath   : process.cwd()
      }, testOptions);

      if(typeof karma.Server !== 'function'){
        console.log(baseBuildUtils.getBaseBuildName() + chalk.red('Please update karma to v0.13 to continue...'));
        process.exit(1);
      }

      server = new karma.Server(karmaOptions, function(){ testOptions.done() });
      server.start();
    });
  }

  gulp.task('test', ['scripts'], function(done) {
    var testConfig = _.extend(options.modulesData['unitTests'].testConfig, {done : done});
    runTests(testConfig, options);
  });

  gulp.task('test:auto', ['watchTests'], function(done) {
    var testAutoConfig = _.extend(options.modulesData['unitTests'].testAutoConfig, {done : done});
    runTests(testAutoConfig, options);
  });

};
