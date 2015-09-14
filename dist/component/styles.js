'use strict';

var gulp = require('gulp');
var browserSync = require('browser-sync');

var $ = require('gulp-load-plugins')();

var wiredep = require('wiredep').stream;

module.exports = function(options) {
  gulp.task('styles:component', function () {
    var sassOptions = {
      style: 'expanded'
    };

    var injectFiles = [
      options.componentSrc + '/**/*.scss'
    ];

    var excludesFromImport = options.excludes && options.excludes.stylesFromIndexImport ? options.excludes.stylesFromIndexImport : [];

    injectFiles = injectFiles.concat( excludesFromImport.map(function(excludeFromImport){
      return "!" + excludeFromImport;
    }));


    console.log('styles:component', 'injectFiles', injectFiles);
    injectFiles = gulp.src(injectFiles, { read: false });


    var injectOptions = {
      transform: function(filePath) {
        filePath = filePath.replace(options.src + '/app/', '');
        console.log('filePath', filePath);
        return '@import \'' + filePath + '\';';
      },
      starttag: '// injector',
      endtag: '// endinjector',
      addRootSlash: false
    };

    var indexFilter = $.filter(options.componentName + '.scss');
    // var vendorFilter = $.filter('vendor.scss');



    return gulp.src([
      options.src + '/app/' + options.componentName + '.scss'
      // options.src + '/app/vendor.scss'
    ])
      .pipe(indexFilter)
      .pipe($.inject(injectFiles, injectOptions))
      .pipe(indexFilter.restore())
      // .pipe(vendorFilter)
      // .pipe(wiredep(options.wiredep))
      // .pipe(vendorFilter.restore())
      // .pipe($.sourcemaps.init())
      .pipe($.sass(sassOptions)).on('error', options.errorHandler('Sass'))
      .pipe($.autoprefixer()).on('error', options.errorHandler('Autoprefixer'))
      // .pipe($.sourcemaps.write())
      .pipe(gulp.dest(options.componentDist));
  });
};
