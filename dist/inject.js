'use strict';

var $ = require('gulp-load-plugins')();
var _ = require('lodash');

var wiredep = require('wiredep').stream;

module.exports = function(options) {
  var gulp         = require(options.modulesData['gulp'].uses);
  var serverConfig = options.modulesData['server'];

  gulp.task('inject', ['scripts', 'styles'], function () {
    var injectStyles = gulp.src([
      options.tmp + '/serve/app/**/*.css',
      '!' + options.tmp + '/serve/app/vendor.css'
    ], { read: false });


    var injectPaths   = [
      '{' + options.src + ',' + options.tmp + '/serve}/app/**/*.js',
      '!{' + options.src + ',' + options.tmp + '/serve}/app/**/*.env.js'
    ];

    var exceptFiles = _.map(options.specFiles, function(file){
      return '!' + file;
    });

    injectPaths = injectPaths.concat(exceptFiles);

    // console.log("injectPaths: ", injectPaths);

    var injectScripts = gulp.src(injectPaths).pipe($.angularFilesort()).on('error', options.errorHandler('AngularFilesort'));

    // console.log("injectScripts: ", injectScripts);

    var injectOptions = {
      ignorePath: [options.src, options.tmp + '/serve'],
      addRootSlash: false
    };

    var explicitInjectScripts = null;
    var explicitInjectOptions = _.clone(injectOptions);
    var isDevTask             = _.contains(options.devTasks, $.util.env._[0]);

    if( isDevTask ){
      explicitInjectScripts = gulp.src(options.modulesData.scripts.devScripts);
      explicitInjectOptions.starttag = '<!-- inject:dev -->';
    } else {
      explicitInjectScripts = gulp.src(options.modulesData.scripts.prodScripts);
      explicitInjectOptions.starttag = '<!-- inject:prod -->';
    }

    return gulp.src(options.src + '/*.html')
      .pipe($.inject(injectStyles, injectOptions))
      .pipe($.inject(injectScripts, injectOptions))
      .pipe(wiredep(options.wiredep))
      .pipe($.inject(explicitInjectScripts, explicitInjectOptions))
      .pipe( $.if(!serverConfig.isEnabled, $.replace('../' + options.bowerComponents, options.bowerComponents)) )
      .pipe(gulp.dest(options.tmp + '/serve'));

  });
};
