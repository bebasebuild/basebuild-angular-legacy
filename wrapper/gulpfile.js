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
  src          : 'src',
  dist         : '../server/src/main/resources/static',
  tmp          : 'builds/dev',
  e2e          : 'e2e',

  srcEnv       : 'dev/serve/app/project/scripts/environment',
  distEnv      : '../server/src/main/resources/static/',

  componentSrc : '',
  componentDest: '',
  componentDist: '',
  componentName: '',

  errorHandler : function(title) {
    return function(err) {
      gutil.log(gutil.colors.red('[' + title + ']'), err.toString());
      this.emit('end');
    };
  },

  wiredep: {
    directory: 'bower_components',
    exclude: [
      /bootstrap-sass-official\/.*\.js/,
      /bootstrap\.css/,
      'bower_components/angular-input-masks'
    ]
  },

};

/*
  ==========================
  Specs
  ==========================
*/
options.specFiles = [
  options.src + '/**/*.spec.js',
  options.tmp + '/**/*.spec.js',
  options.src + '/**/*.mock.js',
  options.tmp + '/**/*.mock.js'
]

/*
  ==========================
  Custom Excludes
  ==========================
*/
options.excludes = {
  stylesFromIndexImport: [
    options.src + '/app/index.scss',
    options.src + '/app/vendor.scss',
    options.src + '/app/' + options.componentName,
    options.src + '/app/project/styles/**/*.scss'
  ]
};

options.modules = {
  gulp  : '../wrapper/node_modules/gulp'
  //karma : 'karma.conf.js'
}

if(gutil.env.prod){
  options.modules.gulp = 'gulp'
}

options.modulesData = {
  server : {
    routes : {
      '/bower_components': 'bower_components',
      '/environment'     : 'builds/dev/serve/app/project/scripts/environment'
    }
  }
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
