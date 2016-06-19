'use strict';


/*
 * Resources
 */
var $              = null; // Plugins
var _              = require('lodash');
var defaultOptions = null;
var gulp           = null;


/*
 * Module
 */
module.exports = function(options) {

  /*
   * Required resources
   */
  defaultOptions    = options.defaultOptions;
  gulp              = require(options.modulesData['gulp'].uses);
  $                 = options.plugins;
  var utilsModule   = require(options.modulesData['utils'].uses)(options);
  var debugLog      = utilsModule.debugLog('BUILD');


  /*
   * Tasks
   */

  /*
    @name partials
    @description Converts all html to a single file of Javascript,
      bundles everything with angular.module(options.mainAngularModule).run and uses $templateCache for each template.
   */
  gulp.task('partials', function () {

    return gulp.src([
      options.src + '/app/**/*.html',
      options.tmp + '/serve/app/**/*.html'
    ])
      .pipe($.htmlmin({
        collapseWhitespace: true
      }))
      .pipe($.angularTemplatecache('templateCacheHtml.js', {
        module: options.mainAngularModule,
        root: 'app'
      }))
      .pipe(gulp.dest(options.tmp + '/serve/partials/'));
  });


  gulp.task('copyEnviroments', ['scripts'], function(){
    var isDevTask = _.contains(options.devTasks, $.util.env._[0]);
    return gulp.src([options.srcEnv + '**/*.env.js', '!' + options.srcEnv + '**/*.dev.env.js'])
      .pipe( $.if(!isDevTask, gulp.dest(options.distEnv) ) );
  });

  gulp.task('copyEnviroments:tmp', ['scripts'], function(){
    return gulp.src([options.srcEnv + '**/*.env.js'])
      .pipe( gulp.dest(options.tmpEnv) )
  });

  gulp.task('html', ['inject', 'partials', 'copyEnviroments'], function () {
    var partialsInjectFile = gulp.src(options.tmp + '/serve/partials/templateCacheHtml.js', { read: false });
    var partialsInjectOptions = {
      starttag: '<!-- inject:partials -->',
      ignorePath: options.tmp + '/serve/',
      addRootSlash: false
    };

    var htmlFilter = $.filter('*.html',  { restore: true });
    var jsFilter   = $.filter(['**/*.js', '!**/*.env.js'],  { restore: true });
    var cssFilter  = $.filter('**/*.css',  { restore: true });
    var assets;

    return gulp.src(options.tmp + '/serve/*.html')
      .pipe($.inject(partialsInjectFile, partialsInjectOptions))
      .pipe(assets = $.useref.assets())
      .pipe($.rev())
      .pipe(jsFilter)
      .pipe($.ngAnnotate())
      .pipe($.uglify({ preserveComments: $.uglifySaveLicense })).on('error', options.errorHandler('Uglify'))
      .pipe(jsFilter.restore)
      .pipe(cssFilter)
      .pipe($.replace('../../bower_components/bootstrap-sass-official/assets/fonts/bootstrap/', '../assets/fonts/'))
      .pipe($.csso())
      .pipe(cssFilter.restore)
      .pipe(assets.restore)
      .pipe($.useref())
      .pipe($.revReplace())
      .pipe(htmlFilter)
      .pipe($.htmlmin({
        collapseWhitespace: true
      }))
      .pipe(htmlFilter.restore)
      .pipe(gulp.dest(options.dist + '/'))
      .pipe($.size({ title: options.dist + '/', showFiles: true }));
  });

  gulp.task('templates:tmp', function () {
    return gulp.src([ options.src + '/app/**/*.html'])
      .pipe(gulp.dest(options.tmp + '/serve/app/'));
  });

  gulp.task('bower:tmp', function () {
    return gulp.src([ options.bowerComponents + '/**/*' ])
      .pipe(gulp.dest(options.tmp + '/serve/' + options.bowerComponents));
  });


  // Only applies for fonts from bower dependencies
  // Custom fonts are handled by the "other" task
  gulp.task('fonts', function () {
    return gulp.src($.mainBowerFiles())
      .pipe($.filter('**/*.{eot,svg,ttf,woff,woff2}'))
      .pipe($.flatten())
      .pipe(gulp.dest(options.dist + '/assets/fonts/'));
  });

  gulp.task('fonts:tmp', function () {
    return gulp.src($.mainBowerFiles())
      .pipe($.filter('**/*.{eot,svg,ttf,woff,woff2}'))
      .pipe($.flatten())
      .pipe(gulp.dest(options.tmp + '/serve/assets/fonts/'));
  });

  gulp.task('other', function () {
    return gulp.src([
      options.src + '/**/*.*',
      '!' + options.src + '/**/*.{html,css,js,scss,coffee}'
    ])
      .pipe(gulp.dest(options.dist + '/'));
  });

  gulp.task('other:tmp', function () {
    return gulp.src([
      options.src + '/**/*',
      '!' + options.src + '/**/*.{html,css,js,scss,coffee}'
    ])
      .pipe(gulp.dest(options.tmp + '/serve/'));
  });

  gulp.task('clean', function (done) {
    $.del([options.dist + '/', options.tmp + '/'], done);
  });

  gulp.task('build', ['html', 'fonts', 'other']);

  gulp.task('default', ['clean'], function () {
    gulp.start('build');
  });
};
