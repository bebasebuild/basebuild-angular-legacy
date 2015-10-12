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
    bowerComponents   : 'bower_components',

    srcEnv            : 'builds/dev/serve/app/project/scripts/environment',
    tmpEnv            : 'builds/dev/serve/',
    distEnv           : 'builds/release',

    componentSrc      : '',
    componentDest     : '',
    componentDist     : '',
    componentName     : '',

    errorHandler      : function(title) {
      return function(err) {
        gutil.log(gutil.colors.red('[' + title + ']'), err.toString());
        gutil.beep();
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

    devTasks: ['dev', 'watch', 'watchTests', 'serve', 'serve:e2e']

  };

  defaultOptions.wiredep.src = defaultOptions.tmp + '/serve/index.html'

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

    utils     : { defaultValue : './utils.js'   , notLogOnStart: true },

    build     : { defaultValue : './build.js'     },

    e2eTest   : { defaultValue : './e2e-tests.js' },

    inject    : { defaultValue : './inject.js'    },

    proxy     : {
      defaultValue : './proxy.js',
      target    : 'http://localhost:8080',
      regexNext : /\.(html|css|js|png|jpg|jpeg|gif|ico|xml|rss|txt|eot|svg|ttf|woff|woff2|cur|json)(\?((r|v|rel|rev)=[\-\.\w]*)?)?$/
    },

    scripts   : {
      defaultValue : './scripts.js',
      devScripts: [
        defaultOptions.tmp + '/serve/app/**/*.dev*.js',
      ],
      prodScripts: [
        defaultOptions.tmp + '/serve/app/**/*.prod*.js',
      ]
    },

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
      },
    },

    gulp      : { defaultValue : 'gulp'  , notStart: true, isExternal: true},

    karma     : {
      defaultValue : 'karma' ,
      notStart     : true,
      configFile   : 'karma.conf.js',
      isExternal   : true
    },

    docs: {
      defaultValue : './docs.js',
      files        : [
        defaultOptions.src + '/**/*.coffee',
        defaultOptions.src + '/**/*.scss',
      ],
      out: 'docs'
    },

    sonar: {
      defaultValue : './sonar.js',
      login        : null,
      password     : null,
      host         : {
        url : ''
      },
      jdbc : {
        url      : ''
      },
      projectKey     : '',
      projectName    : '',
      projectVersion : '1.0.0',
      sources        : defaultOptions.tmp,
      language       : 'js',
      sourceEncoding : 'UTF-8',
      exclusions     : defaultOptions.specFiles,
      javascript : {
        lcov : {
          reportPath: 'coverage/report-lcov.lcov'
        }
      }
    }
  }


  defaultOptions.modules = {
    // deprecated
  }

  for(key in defaultOptions.modulesData){
    defaultOptions.modulesData[key].isDefault = true;
    defaultOptions.modulesData[key].isEnabled = true;
    defaultOptions.modulesData[key].uses = defaultOptions.modulesData[key].defaultValue;

  }


  return defaultOptions;

}