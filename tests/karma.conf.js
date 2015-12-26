'use strict';

module.exports = function(config) {

  var configuration = {
    autoWatch : false,

    logLevel: config.LOG_ERROR,

    frameworks: ['jasmine', 'requirejs'],

    // files : [
    //   "builds/dev/serve/app/**/*.js"
    // ],


    phantomjsLauncher: {
      debug: true,

      // Have phantomjs exit if a ResourceError is encountered (useful if karma exits without killing phantom)
      exitOnResourceError: true
    },

    // reporter options
    nyanReporter: {
      // suppress the error report at the end of the test run
      suppressErrorReport: false,

      // increase the number of rainbow lines displayed
      // enforced min = 4, enforced max = terminal height - 1
      numberOfRainbowLines : 4 // default is 4
    },

    htmlReporter: {
      outputDir: 'tests/result/', // where to put the reports
      templatePath: null, // set if you moved jasmine_template.html
      focusOnFailures: true, // reports show failures on start
      namedFiles: false, // name files instead of creating sub-directories
      pageTitle: null, // page title for reports; browser info by default
      urlFriendlyName: false, // simply replaces spaces with _ for files/dirs
      reportName: 'reportAsJasmine', // report summary filename; browser info by default
      // experimental
      preserveDescribeNesting: true, // folded suites stay folded
      foldAll: true, // reports start folded (only with preserveDescribeNesting)
    },

    dhtmlReporter: {
      'outputFile' : '/tests/dhtmlReport.html',
      'exclusiveSections': true,
      'openReportInBrowser': false
    },

    ngHtml2JsPreprocessor: {
      stripPrefix: 'src/',
      moduleName: 'karma.templates'
      // moduleName: function (htmlPath, originalPath) {
      //   console.log('Karma: ', htmlPath);
      //   return 'karma.templates';
      // }
    },

    browsers : [
      'PhantomJS'
      // 'Chrome'
    ],

    plugins : [
      'karma-phantomjs-launcher',
      'karma-jasmine',
      'karma-ng-html2js-preprocessor',
      'karma-coverage',
      "karma-chrome-launcher",
      "karma-dhtml-reporter",
      'karma-nyan-reporter',
      'karma-requirejs'
    ],

    preprocessors: {
      'src/**/*.html'   : ['ng-html2js'],
      '../dist/**/*.js' : ['coverage'],
    },

    // generates the coverage
    reporters: [
      // 'progress',
      'nyan',
      // 'html',
      // 'DHTML',
      'coverage'
    ],

    // Output coverage file
    coverageReporter: {
      dir : 'coverage/',
      instrumenterOptions: {
        istanbul: { noCompact: true }
      },
      reporters: [
        { type: 'html', subdir: 'html' },
        { type: 'lcovonly', subdir: '.', file: 'report-lcov.lcov'}
      ]

    },

    exclude: [
    ]

  };

  if(process.env.app){
    configuration.preprocessors['builds/dev/serve/{app,components}/**/!(*spec|*mock).js'] = ['coverage'];
  } 

  console.log('config files', config.files);





  // This block is needed to execute Chrome on Travis
  // If you ever plan to use Chrome and Travis, you can keep it
  // If not, you can safely remove it
  // https://github.com/karma-runner/karma/issues/1144#issuecomment-53633076
  if(configuration.browsers[0] === 'Chrome' && process.env.TRAVIS) {
    configuration.customLaunchers = {
      'chrome-travis-ci': {
        base: 'Chrome',
        flags: ['--no-sandbox']
      }
    };
    configuration.browsers = ['chrome-travis-ci'];
  }

  config.set(configuration);
};
