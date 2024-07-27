'use strict';

var gulp   = require('gulp');
var gutil  = require('gulp-util');

/*
  ==========================
  Basic Options
  ==========================
*/
var options = {
  mainAngularModule : 'BaseBuildWrapper',
  debug             : true
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
  gulp: {
    uses: '../demo/node_modules/gulp'
  },
  karma: {
    uses: '../demo/node_modules/karma'
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
    projectVersion : '1.0.2'
  },

  unitTests: {
    excludeFiles: [
      'builds/dev/serve/app/**/init.dev.env.js',
      'builds/dev/serve/app/**/init.prod.env.js'
    ]
  },

  proxy: {
    isEnabled: false
  }
}

if(gutil.env.prod){
  options.modulesData.gulp.uses  = 'gulp'
  options.modulesData.karma.uses = 'karma'
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
