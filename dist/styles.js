'use strict';


/**
 * Basebuild styles module, to manage stylesheets
 */
var StylesModule = function(options) {

  /*
   * Required resources
   */
  var gulp          = require(options.modulesData['gulp'].uses);
  var moduleOptions = options.modulesData['styles'];
  var utilsModule   = require(options.modulesData['utils'].uses)(options);
  var $             = options.plugins;
  var browserSync   = $.browserSync;
  var wiredep       = $.wiredep.stream;
  var debugLog      = utilsModule.debugLog('SASS');

  var sassOptions      = {},
    injectFiles        = [],
    excludesFromImport = [],
    injectOptions      = {};


  /*
   * Methods
   */

  function setup (argument) {
    sassOptions = {
      style: 'expanded'
    };

    injectFiles = [
      options.src + '/app/**/*.scss'
    ];

    excludesFromImport = options.excludes && options.excludes.stylesFromIndexImport ? options.excludes.stylesFromIndexImport : [];

    injectOptions = {
      addRootSlash : false,
      starttag     : '// injector',
      endtag       : '// endinjector',
      transform    : function(filePath) {
        filePath = filePath.replace(options.src + '/app/', '');
        return '@import \'' + filePath + '\';';
      }
    };

    injectFiles = injectFiles.concat( excludesFromImport.map(function(excludeFromImport){
      return "!" + excludeFromImport;
    }));

    debugLog('setup - injectFiles and injectOptions', injectFiles, injectOptions);

    injectFiles = gulp.src(injectFiles, { read: false });



  }

  function processStyles () {
    setup();

    var indexFilter  = $.filter([moduleOptions.mainFile],  { restore: true });
    var src          = [
      moduleOptions.mainFile,
      options.src + '/app/vendor.scss'
    ];
    var vendorFilter = $.filter(src,  { restore: true });

    debugLog('processStyles - options.wiredep', options.wiredep);
    debugLog('processStyles - mainFile',  moduleOptions.mainFile);
    debugLog('processStyles - src', src);

    return gulp.src(src)

      .pipe(indexFilter)
      .pipe($.inject(injectFiles, injectOptions))
      .pipe(indexFilter.restore)

      .pipe(vendorFilter)
      .pipe($.debug())
      .pipe(wiredep(options.wiredep))
      .pipe(vendorFilter.restore)

      .pipe($.sourcemaps.init())
      .pipe($.sass(sassOptions)).on('error', options.errorHandler('Sass'))
      .pipe($.sourcemaps.write())

      .pipe(gulp.dest(options.tmp + '/serve/app/'))
      .pipe(browserSync.stream({ match: '**/*.css' }));
  }

  /*
   * Tasks
   */
  gulp.task('styles', processStyles);

  return {
    processStyles: processStyles
  }
};

/*
 * Module exports
 */
module.exports = StylesModule;
