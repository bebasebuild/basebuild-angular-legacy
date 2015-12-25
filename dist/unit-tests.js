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

  var wiredepOptions = _.extend({}, options.wiredep, {
    dependencies: true,
    devDependencies: true,
    stream: null
  });

  var bowerDeps      = wiredep(wiredepOptions);
  var excludeFiles   = options.modulesData['unitTests'].excludeFiles || [];
  var additionalDeps = options.modulesData['unitTests'].addDeps || [];
  var specFiles      = options.specFiles || [];
  var envFiles       = {
   all: options.tmp + '/serve/app/**/*.env.js',
   dev: options.tmp + '/serve/app/**/*.dev.env.js',
   prod: options.tmp + '/serve/app/**/*.prod.env.js',
   found: []
  };

  var htmlFiles = [
    options.src + '/**/*.html'
  ];

  var srcFiles = [
    options.tmp + '/serve/app/**/*.js'
  ].concat(specFiles.map(function(file) {
    return '!' + file;
  }));

  srcFiles.unshift(envFiles.all);

  if($.util.env.prodTest){
    srcFiles = srcFiles.concat(options.modulesData.scripts.prodScripts);
  } else {
    srcFiles = srcFiles.concat(options.modulesData.scripts.devScripts);
  }

  console.log('srcFiles', srcFiles)

  excludeFiles = excludeFiles.map(function(file) {
    return '!' + file;
  });

  srcFiles = srcFiles.concat(excludeFiles);


  function concatFilesToTest(files){
    var filesToTest = [];

    filesToTest = filesToTest
      .concat(bowerDeps.js)
      .concat(additionalDeps)
      .concat(files)
      .concat(htmlFiles)
      .concat(specFiles)
      .concat(excludeFiles)

    return _.compact(filesToTest);

  }

  function listFiles(callback) {
    var filters = {
      env : $.filter(envFiles.all),
      src : $.filter(['**/*.js', '!**/*.env.js'])
    };

    var onConcatStream = function(files) {    
      var filesToTest = concatFilesToTest( _.pluck(files, 'path') );
      callback(filesToTest);
    };
  
    gulp.src( srcFiles )
      .pipe(filters.env)
      .pipe($.angularFilesort()).on('error', options.errorHandler('AngularFilesort'))
      .pipe(filters.env.restore())
      .pipe(filters.src)        
      .pipe($.angularFilesort()).on('error', options.errorHandler('AngularFilesort'))
      .pipe(filters.src.restore())
      .pipe(concat(onConcatStream));
  }

  function runKarmaServer(){

  }

  function runTests (testOptions, options) {
    var runKarmaServer = function(files) {

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

      var errorHandler = options.errorHandler('Karma Server - Unit Tests');
      server.on('browser_error', function(browser, err){
        errorHandler(browser);
        errorHandler(err);
      });
      server.start();
    }
  
    listFiles(runKarmaServer);
      
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
