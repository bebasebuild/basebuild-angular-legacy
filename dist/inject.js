'use strict';

var $ = require('gulp-load-plugins')();
var _ = require('lodash');

var wiredep = require('wiredep').stream;

module.exports = function(options) {
  var gulp         = require(options.modulesData['gulp'].uses);
  var serverConfig = options.modulesData['server'];
  var isDevTask    = _.contains(options.devTasks, $.util.env._[0]);
  var scriptsPattern = [];

  gulp.task('inject', ['scripts', 'styles', 'copyEnviroments'], function () {
    var injectStyles = gulp.src([
      options.tmp + '/serve/app/**/*.css',
      '!' + options.tmp + '/serve/app/vendor.css'
    ], { read: false });


    var injectPaths   = [
      '{' + options.src + ',' + options.tmp + '/serve}/app/**/*.js',
      '!{' + options.src + ',' + options.tmp + '/serve}/app/**/*.env.js'
    ];


    if(isDevTask){
      scriptsPattern = _.compact( scriptsPattern.concat(options.modulesData.scripts.devScripts) );
    } else {
      scriptsPattern = _.compact( scriptsPattern.concat(options.modulesData.scripts.prodScripts) );
    }

    
    var exceptFiles = _.map(options.specFiles, function(file){
      return '!' + file;
    });

    injectPaths = injectPaths.concat(scriptsPattern).concat(exceptFiles);

    console.log("injectPaths: ", injectPaths);

    var injectScripts = gulp.src(injectPaths).pipe($.angularFilesort()).on('error', options.errorHandler('AngularFilesort'));

    // console.log("injectScripts: ", injectScripts);

    var injectOptions = {
      ignorePath: [options.src, options.tmp + '/serve'],
      addRootSlash: false
    };

    var envInjectScripts      = null;
    var envInjectOptions      = _.clone(injectOptions);
    envInjectOptions.starttag = '<!-- inject:env -->';

    if( isDevTask ){
      envInjectScripts = gulp.src([
        '{' + options.src + ',' + options.tmp + '/serve}/app/**/*.env.js',
        '{' + options.src + ',' + options.tmp + '/serve}/app/**/*.dev.env.js',
        '!{' + options.src + ',' + options.tmp + '/serve}/app/**/*.prod.env.js'
      ]);
    } else {
      envInjectScripts = gulp.src([
        '{' + options.src + ',' + options.tmp + '/serve}/app/**/*.env.js',
        '{' + options.src + ',' + options.tmp + '/serve}/app/**/*.prod.env.js',
        '!{' + options.src + ',' + options.tmp + '/serve}/app/**/*.dev.env.js'
      ]);
    }

    return gulp.src(options.src + '/*.html')
      .pipe($.inject(injectStyles, injectOptions))
      .pipe($.inject(injectScripts, injectOptions))
      .pipe(wiredep(options.wiredep))
      .pipe($.inject(envInjectScripts, envInjectOptions))
      .pipe( $.if(!serverConfig.isEnabled, $.replace('../' + options.bowerComponents, options.bowerComponents)) )
      .pipe(gulp.dest(options.tmp + '/serve'));

  });
};
