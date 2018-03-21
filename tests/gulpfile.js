'use strict';

var gulp              = require('gulp');
var gutil             = require('gulp-util');
var basebuildMainFile = '../dist/main.js';

/*
  ==========================
  Basic basebuildOptions
  ==========================
*/
var basebuildOptions = {
  mainAngularModule : 'BaseBuildTests'
};


/*
  ==========================
  Base build
  ==========================
*/

basebuildOptions.modulesData = {

  gulp : {
    uses: '../tests/node_modules/gulp'
  },
  karma: {
    uses: '../tests/node_modules/karma',
    isEnabled: false
  },

  sonar: {
    host         : {
      url : 'http://192.168.99.100:9000'
    },
    jdbc : {
      url      : 'jdbc:h2:tcp://192.168.99.100/sonar'
    },
    projectKey     : 'io.timeoutzero:basebuild-angular-tests',
    projectName    : 'basebuild angular tests',
    projectVersion : '1.0.0'
  },

  unitTests: {
    uses: 'gulp/unitTests.js'
  },

  proxy: {
    // target: 'http://localhost:4000',

    proxyRules: {
      rules : {
        '/python1/' : {
          removePrefix: true,
          target: 'http://localhost:9000'
        },
        '/python2/' : 'http://localhost:9001',
      },

      default: 'http://localhost:4000',
    }
  },
}

if(gutil.env.prod){
  basebuildOptions.modulesData.gulp.uses  = 'gulp';
  basebuildOptions.modulesData.karma.uses = 'karma';
  basebuildMainFile                       = 'basebuild-angular';
}

// if(gutil.env.proxies){
//   options.modulesData.proxy = {
//     uses : 'gulp/multiProxy.js'
//   }
// }


/*
  ==========================
  Read gulp files
  ==========================
*/


require(basebuildMainFile)(basebuildOptions);
