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

  defaultOptions.modulesData = {
    build     : { defaultValue : './build.js'      },
    e2eTest   : { defaultValue : './e2e-tests.js'  },
    inject    : { defaultValue : './inject.js'     },
    proxy     : { defaultValue : './proxy.js'      },
    scripts   : { defaultValue : './scripts.js'    },
    styles    : { defaultValue : './styles.js'     },
    unitTests : { defaultValue : './unit-tests.js' },
    watch     : { defaultValue : './watch.js'      },
    server    : { defaultValue : './server.js'     },
    gulp      : { defaultValue : 'gulp'            }
  }


  defaultOptions.modules = {
    build     : defaultOptions.modulesData.build.defaultValue,
    e2eTest   : defaultOptions.modulesData.e2eTest.defaultValue,
    inject    : defaultOptions.modulesData.inject.defaultValue,
    proxy     : defaultOptions.modulesData.proxy.defaultValue,
    scripts   : defaultOptions.modulesData.scripts.defaultValue,
    styles    : defaultOptions.modulesData.styles.defaultValue,
    unitTests : defaultOptions.modulesData.unitTests.defaultValue,
    watch     : defaultOptions.modulesData.watch.defaultValue,
    server    : defaultOptions.modulesData.server.defaultValue,
    gulp      : defaultOptions.modulesData.gulp.defaultValue
  }


  return defaultOptions;

}