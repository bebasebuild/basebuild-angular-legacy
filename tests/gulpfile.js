'use strict';

var gulp   = require('gulp');
var gutil  = require('gulp-util');

/*
  ==========================
  Basic Options
  ==========================
*/
var options = {
  mainAngularModule : 'BaseBuildTests'
};


/*
  ==========================
  Base build
  ==========================
*/

options.modulesData = {
  
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
    projectVersion : '1.0.0',
  },

  unitTests: {
    uses: 'gulp/unitTests.js'
  }
}

if(gutil.env.prod){
  options.modulesData.gulp.uses  = 'gulp'
  options.modulesData.karma.uses = 'karma'
}

// if(!gutil.env.demo){
//   options.modulesData.unitTests = {
//     addDeps: [
//       '../dist/utils.js',
//       // '../node_modules/chalk/index.js',
//       '../node_modules/**/*.js',
//       // { pattern: '../node_modules/**/*.js', included: false},
//       '../specs/*.js'
//     ],

//     excludeFiles: [
//       'builds/dev/serve/app/**/init.dev.env.js',
//       'builds/dev/serve/app/**/init.prod.env.js'
//     ]
//   };
// }



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
