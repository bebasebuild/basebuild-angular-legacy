
var _     = require('lodash');
var chalk = require('chalk');
var gutil = require('gulp-util');

module.exports = function(options){


  var defaultOptions = require('./defaults.js')();
  options            = _.defaultsDeep(options, defaultOptions);
  var baseBuildUtils = require(defaultOptions.modulesData['utils'].uses)(options);
  var baseBuildName  = baseBuildUtils.getBaseBuildName();

  /*
    ==========================
    Imaginations
    ==========================
  */
  console.log( '\n   ' + baseBuildUtils.getTimeoutZeroName() + ' is a ' + baseBuildUtils.getRedsparkName() + ' imagination,'  );
  console.log( '   ' + baseBuildUtils.getBaseBuildName(true) + ' is a ' + baseBuildUtils.getTimeoutZeroName() + ' imagination...\n');

  /*
    ==========================
    Read gulp files
    ==========================
  */
  for(key in options.modulesData){
    var value      = options.modulesData[key].uses;
    var category   = chalk.green(' external ');
    var useMode    = '';

    !options.modulesData[key] && (options.modulesData[key] = {});
    var moduleData = options.modulesData[key];

    !moduleData.notStart ? (useMode = 'required') : (useMode = 'using');
    moduleData.requireName = value;

    if(defaultOptions.modulesData[key] && value === defaultOptions.modulesData[key].defaultValue && !moduleData.isExternal){
      category = chalk.cyan(' built-in ');
    } else {
      moduleData.isDefault  = false;
      moduleData.isExternal = true;
      moduleData.requireName = process.cwd() + "/" + value;
    }

    if(!moduleData.notStart && moduleData.isEnabled ){
      var module = require( moduleData.requireName );
      _.isFunction(module) && module(options);

    }

    !moduleData.notLogOnStart && moduleData.isEnabled && console.log( baseBuildName + useMode + category + chalk.magenta(value) + ' module');


  }

  console.log('\n');
}