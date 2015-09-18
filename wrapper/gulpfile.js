'use strict';

var gulp   = require('gulp');
var gutil  = require('gulp-util');
var wrench = require('wrench');

/*
  ==========================
  Basic Options
  ==========================
*/
var options = {
  mainAngularModule : 'BaseBuildWrapper'
};


/*
  ==========================
  Base build
  ==========================
*/

options.modulesData = {
  // newModule: {
  //   uses: 'newModule.js'
  // },
  gulp : {
    uses: '../wrapper/node_modules/gulp'
  },
  karma: {
    uses: '../wrapper/node_modules/karma'
  },
  server : {
    routes : {
      '/bower_components': 'bower_components',
      '/environment'     : 'builds/dev/serve/app/project/scripts/environment'
    }
  }
}

if(gutil.env.prod){
  options.modulesData.gulp  = 'gulp'
  options.modulesData.karma = 'karma'
}

/*
  ==========================
  Read gulp files
  ==========================
*/
var basebuildMainFile = '../dist/main.js';
if(gutil.env.prod){
  basebuildMainFile = 'basebuild-angular';
}

require(basebuildMainFile)(options);


/*
  ==========================
  Default Task
  ==========================
*/
gulp.task('default', ['clean'], function () {
    gulp.start('build');
});
