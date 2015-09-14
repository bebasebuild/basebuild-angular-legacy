var gutil  = require('gulp-util');

module.exports = function(){

  /*
    ==========================
    Basic Options
    ==========================
  */
  var defaultOptions = {
    src          : 'src',
    dist         : 'builds/release',
    tmp          : 'builds/dev',
    e2e          : 'e2e',

    srcEnv       : 'dev/serve/app/project/scripts/environment',
    distEnv      : 'builds/release',

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
  defaultOptions.specFiles = [
    defaultOptions.src + '/**/*.spec.js',
    defaultOptions.tmp + '/**/*.spec.js',
    defaultOptions.src + '/**/*.mock.js',
    defaultOptions.tmp + '/**/*.mock.js'
  ]

  /*
    ==========================
    Custom Excludes
    ==========================
  */
  defaultOptions.excludes = {
    stylesFromIndexImport: [
      defaultOptions.src + '/app/index.scss',
      defaultOptions.src + '/app/vendor.scss',
      defaultOptions.src + '/app/' + defaultOptions.componentName,
      defaultOptions.src + '/app/project/styles/**/*.scss'
    ]
  };


  /*
    ==========================
    modules
    ==========================
  */
  defaultOptions.modules = {
    build     : './build.js',
    e2eTest   : './e2e-tests.js',
    inject    : './inject.js',
    proxy     : './proxy.js',
    scripts   : './scripts.js',
    styles    : './styles.js',
    unitTests : './unit-tests.js',
    watch     : './watch.js'
  }


  return defaultOptions;

}