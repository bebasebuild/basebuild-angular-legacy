'use strict';



var browserSync = null;
var util = require('util');

module.exports = function(options) {

  /*
   * Required resources
   */
  var gulp           = require(options.modulesData['gulp'].uses);
  var baseBuildUtils = require(options.modulesData['utils'].uses)(options);
  var middlewares    = baseBuildUtils.requireModule('proxy')(options).middlewares;
  var moduleOptions  = options.modulesData['server'];
  var $              = options.plugins;  
  browserSync        = $.browserSync;
  var browserSyncSpa = $.browserSyncSpa;
  var debugLog       = baseBuildUtils.debugLog('SERVER');

  debugLog('moduleOptions', moduleOptions);

  /*
   * Methods
   */
  function logBSStart (argument) {
    console.log(baseBuildUtils.getBaseBuildName() + 'Starting BrowserSync...');
  }

  function browserSyncInit(baseDir, browser) {
    browser = browser === undefined ? 'default' : browser;

    var routes = null;
    if(baseDir === options.src || (util.isArray(baseDir) && baseDir.indexOf(options.src) !== -1)) {
      routes = options.modulesData.server.routes || {};
    }

    var server = {
      baseDir: baseDir,
      routes: routes
    };


    if(middlewares.length > 0) {
      server.middleware = middlewares;
    }

    browserSync.instance = browserSync.init({
      startPath: '/',
      server: server,
      browser: browser
    });
  }

  browserSync.use(browserSyncSpa({
    selector: '[ng-app]'// Only needed for angular apps
  }));


  /*
   * Tasks
   */
  gulp.task('serve', ['watch'], function () {
    logBSStart();
    browserSyncInit([options.tmp + '/serve', options.src]);
  });

  gulp.task('dev', ['serve']);

  gulp.task('serve:dist', ['build'], function () {
    logBSStart();
    browserSyncInit(options.dist);
  });

  gulp.task('serve:e2e', ['inject'], function () {
    logBSStart();
    browserSyncInit([options.tmp + '/serve', options.src], []);
  });

  gulp.task('serve:e2e-dist', ['build'], function () {
    logBSStart();
    browserSyncInit(options.dist, []);
  });
};
