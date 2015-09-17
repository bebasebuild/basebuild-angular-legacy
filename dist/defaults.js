var gutil  = require('gulp-util');

module.exports = function(){

  /*
    ==========================
    Basic Options
    ==========================
  */
  var defaultOptions = {
    mainAngularModule : 'MainAngularModule',
    src               : 'src',
    dist              : 'builds/release',
    tmp               : 'builds/dev',
    e2e               : 'e2e',

    srcEnv            : 'builds/dev/serve/app/project/scripts/environment',
    distEnv           : 'builds/release',

    componentSrc      : '',
    componentDest     : '',
    componentDist     : '',
    componentName     : '',

    errorHandler      : function(title) {
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
      //defaultOptions.src + '/app/' + defaultOptions.componentName,
      defaultOptions.src + '/app/project/styles/**/*.scss'
    ]
  };


  /*
    ==========================
    modules
    ==========================
  */

  defaultOptions.modulesData = {
    build     : { defaultValue : './build.js'     },
    e2eTest   : { defaultValue : './e2e-tests.js' },
    inject    : { defaultValue : './inject.js'    },
    proxy     : { defaultValue : './proxy.js'     },
    scripts   : { defaultValue : './scripts.js'   },
    styles    : { defaultValue : './styles.js'    },
    unitTests : {
      defaultValue : './unit-tests.js',
      addDeps      : [],
      testConfig   : {
        singleRun : true,
        browsers  : ['Chrome']
      },
      testAutoConfig : {
        singleRun : false,
        browsers  : ['Chrome']
      }
    },
    watch     : { defaultValue : './watch.js'     },
    server    : {
      defaultValue : './server.js',
      routes       : {
        '/bower_components': 'bower_components'
      }
    },
    gulp      : { defaultValue : 'gulp'  , notStart: true, isExternal: true},
    karma     : {
      defaultValue : 'karma' ,
      notStart     : true,
      configFile   : 'karma.conf.js',
      isExternal   : true
   }
  }


  defaultOptions.modules = {}

  for(key in defaultOptions.modulesData){
    defaultOptions.modulesData[key].isDefault = true;
    defaultOptions.modulesData[key].uses = defaultOptions.modulesData[key].defaultValue;

  }


  return defaultOptions;

}