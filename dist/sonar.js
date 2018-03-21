'use strict';

module.exports = function(options){

  var $ = options.plugins;

  var gulp  = require(options.modulesData.gulp.uses);

  var sonarqubeScanner = require('sonarqube-scanner');

  gulp.task('sonar', ['test'], function(done){

    // gulp source doesn't matter, all files are referenced in options object above
    sonarqubeScanner(options.modulesData['sonar'], done);

  });

}