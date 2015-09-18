'use strict';


var browserSync = require('browser-sync');
var browserSyncSpa = require('browser-sync-spa');

var util = require('util');

module.exports = function(options) {

  var gulp           = require(options.modulesData['gulp'].uses);
  var middleware     = require(options.modulesData['proxy'].uses)(options);
  var baseBuildUtils = require(options.modulesData['utils'].uses)(options);

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


    if(middleware.length > 0) {
      server.middleware = middleware;
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
