

var nodePlugins = require('gulp-load-plugins')({
  pattern: [
    '*',
    '!gulp',
    '!protractor'
  ]
});

var _ = nodePlugins.lodash;

module.exports = function(){

  /*
    ==========================
    Basic Options
    ==========================
  */
  var defaultOptions = {
    
    // ************* Main folders ****************

    // Main angular module of project. 
    // Will be used on $templateCache provider when generate partials.
    mainAngularModule : 'MainAngularModule',
    
    
    // ************* Main folders ****************

    // Source folder, where source code is present.
    src               : 'src',

    // Temporary development folder, where code is present on development.
    tmp               : 'builds/dev',

    // Production folder, where source code is present on final version.
    dist              : 'builds/release',
    
    // Location for e2e tests
    e2e               : 'e2e',

    // Location of bower_components folder
    bowerComponents   : 'bower_components',


    // ************* Eviroment Location ****************

    srcEnv            : 'builds/dev/serve/',
    tmpEnv            : 'builds/dev/serve/',
    distEnv           : 'builds/release/',


    // ************* Dev Phase ****************
    devTasks: ['dev', 'watch', 'watchTests', 'serve', 'serve:e2e']

  };


  /*
    ==========================
    Stream Errors
    ==========================
  */
  defaultOptions.errorHandler = function(title) {
    return function(err) {
      nodePlugins.util.log(nodePlugins.util.colors.red('[' + title + ']'), err.toString());
      nodePlugins.util.beep();
      _.isFunction(this.emit) && this.emit('end');
    };
  };


  /*
    ==========================
    wiredep
    ==========================
  */
  defaultOptions.wiredep = {
    directory: 'bower_components',
    src      : defaultOptions.tmp + '/serve/index.html',
    exclude: [
      /bootstrap-sass-official\/.*\.js/,
      /bootstrap\.css/,
      'bower_components/angular-input-masks'
    ]
  };

  /*
    ==========================
    Specs
    ==========================
  */
  defaultOptions.specFiles = [
    defaultOptions.tmp + '/**/*.spec.js',
    defaultOptions.tmp + '/**/*.mock.js'
  ];

  
  /*
    ==========================
    Plugins
    ==========================
    Plugins are lazy loaded but in practice you won't notice any difference (https://www.npmjs.com/package/gulp-load-plugins)
  */
  defaultOptions.plugins =  nodePlugins;


  /*
    ==========================
    modules
    ==========================
  */
 
  /*
  Basebuild works with modules. There is one module for each feature,   
  Built-in modules: {
    utils     : {}
    build     : {}     
    e2eTest   : {}   
    inject    : {}    
    proxy     : {}
    scripts   : {}
    styles    : {}
    unitTests : {}
    watch     : {}
    server    : {}
    docs      : {}
    sonar     : {}
  }
  */
  defaultOptions.modulesData = {
    
    /*
    
    moduleExample: {
      *** Basic built-in property ***  
      defaultValue : 'path/script.js'
    
      *** Common options between modules ***
      uses          : 'path/script.js'
      notStart      : true || false,
      notLogOnStart : true || false,
      isDefault     : true || false,
      isExternal    : true || false
    }
    
    */
  

    /*
      utils Module
      Access to general utilities of basebuild
    */
    utils : { 
      defaultValue : './utils.js'   ,
      notLogOnStart: true 
    },


    /*
      build module
      Responsible for production version of the project. 
    */
    build: { 
      defaultValue : './build.js'     
    },


    /*
      e2eTest module
      Works in e2e tests. 
    */
    e2eTest: { 
      defaultValue : './e2e-tests.js' 
    },


    /*
      inject module
      Injects scripts and stylesheets automatically in index.html.
    */
    inject: { 
      defaultValue : './inject.js'    
    },


    /*
      proxy module
      Proxy settings for server module (browser-sync + http-proxy)
    */
    proxy: {
      defaultValue : './proxy.js',

      // Specifies the proxy target (server address)
      target    : 'http://localhost:8080',

      // All Requests are tested with this regex to prevent the proxy when it's considered true
      preventWhen: /\.(html|css|js|png|jpg|jpeg|gif|ico|xml|rss|txt|eot|svg|ttf|woff|woff2|cur|json)(\?((r|v|rel|rev)=[\-\.\w]*)?)?$/
    },


    /*
      scripts module
      Works with CoffeeScript and Javascript files
    */
    scripts: {
      defaultValue : './scripts.js',

      // Pattern for scripts only present on development phase (dev tasks)
      devScripts: [
        defaultOptions.tmp + '/serve/app/**/*.dev*.js',
        '!' + defaultOptions.tmp + '/serve/app/**/*.prod*.js',
      ],

      // Pattern for scripts only present on production phase
      prodScripts: [
        defaultOptions.tmp + '/serve/app/**/*.prod*.js',
        '!' + defaultOptions.tmp + '/serve/app/**/*.dev*.js',
      ]
    },


    /*
      styles module
      Works with SASS (*.scss) files
    */
    styles: { 
      defaultValue : './styles.js',
      mainFile: defaultOptions.src + '/app/index.scss',
    },


    /*
      unitTests module
      Works in unit tests for scripts (CoffeeScripts and Javascript)
    */
    unitTests: {
      defaultValue : './unit-tests.js',

      // Pattern for additional dependencies that must be injected in tests
      addDeps      : [],

      // Pattern to exclude files in tests
      excludeFiles : [],
      
      // Karma settings for "test" task
      testConfig   : {
        
        // Run the tests only one single time
        singleRun : true,
        
        browsers  : ['Chrome']
      },

      // Karma settings for "test:auto" task
      testAutoConfig : {

        // Run the tests and wait for changes to run it again
        singleRun : false,

        browsers  : ['Chrome']
      }
    },


    /*
      watch module
      Wait for changes in files to react with some callback
    */
    watch: { 
      defaultValue : './watch.js'     
    },


    /*
      watch module
      Serves the project files
    */
    server    : {
      defaultValue : './server.js',

      // Creates routes to access files 
      routes       : {
        '/bower_components': 'bower_components'
      }
    },


    /*
      External module which will be the reference for gulp
    */
    gulp: { 
      defaultValue : 'gulp'  , 
      notStart: true, 
      isExternal: true
    },


    /*
      External module which will be the reference for karma
    */
    karma     : {
      defaultValue : 'karma' ,
      notStart     : true,
      configFile   : 'karma.conf.js',
      isExternal   : true
    },


    /*
      docs module
      Generate documentation for source code
    */
    docs: {
      defaultValue : './docs.js',

      // Pattern for source code files
      files        : [
        defaultOptions.src + '/**/*.coffee',
        defaultOptions.src + '/**/*.scss',
      ],

      // Output folder
      out: 'docs'
    },

    /*
      sonar module
      Sends coverage report to sonarqube
    */
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
  };

  // deprecated for a while
  defaultOptions.modules = {};


  /*
    ==========================
    Custom Excludes
    ==========================
  */
  defaultOptions.excludes = {
    stylesFromIndexImport: [
      defaultOptions.modulesData.styles.mainFile,
      defaultOptions.src + '/app/vendor.scss',
      defaultOptions.src + '/app/project/styles/**/*.scss'
    ]
  };



  // Common initial properties
  for(key in defaultOptions.modulesData){
    defaultOptions.modulesData[key].isDefault = true;
    defaultOptions.modulesData[key].isEnabled = true;
    defaultOptions.modulesData[key].uses = defaultOptions.modulesData[key].defaultValue;
  }


  // Migrate properties
  defaultOptions.migrate = {
    active : true,
    trace: false
  }


  return defaultOptions;

}