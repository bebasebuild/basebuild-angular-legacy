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
    uses: '../demo/node_modules/gulp'
  },
  karma: {
    uses: '../demo/node_modules/karma'
  },
  server : {
    routes : {
      '/bower_components': 'bower_components',
      '/environment'     : 'builds/dev/serve/app/project/scripts/environment'
    },
    isEnabled: true
  },

  sonar: {
    host         : {
      url : 'http://192.168.99.100:9000'
    },
    jdbc : {
      url      : 'jdbc:h2:tcp://192.168.99.100/sonar'
    },
    projectKey     : 'io.timeoutzero:basebuild-angular-demo',
    projectName    : 'basebuild angular demo',
    projectVersion : '1.0.2',
  }
}

if(gutil.env.prod){
  options.modulesData.gulp.uses  = 'gulp'
  options.modulesData.karma.uses = 'karma'
}

if(!gutil.env.demo){
  options.modulesData.unitTests = {
    addDeps: [
      '../dist/utils.js',
      '../specs/*.js',
      '../node_modules/chalk/index.js'
      // 'builds/dev/serve/app/**/variables.env.js'
    ],

    excludeFiles: [
      'builds/dev/serve/app/**/init.dev.env.js',
      'builds/dev/serve/app/**/init.prod.env.js'
    ]
  };
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
