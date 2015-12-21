
var _     = require('lodash');
var chalk = require('chalk');
var gutil = require('gulp-util');


var basebuildMainScript = function(options){

  var defaultOptions = require('./defaults.js')();
  options            = _.defaultsDeep(options, defaultOptions);

  // Set default options in global options to never require ./defaults.js more than once
  options.defaultOptions = defaultOptions;

  var baseBuildUtils = require(defaultOptions.modulesData['utils'].uses)(options);
  var baseBuildName  = baseBuildUtils.getBaseBuildName();
  var packageJSON    = require('../package.json');
  
  /*
    ==========================
    Imaginations
    ==========================
  */
  console.log('\n\n');
  console.log(' ____                 _             _     _         '  + chalk.red('_                      _            ')     );
  console.log('| __ )  __ _ ___  ___| |__  _   _(_) | __| |       '   + chalk.red('/ \\   _ __   __ _ _   _| | __ _ _ __ ')    );
  console.log('|  _ \\ / _` / __|/ _ | `_ \\| | | | | |/ _` |_____ '  + chalk.red('/ _ \\ |  `_ \\ / _`| | | | |/ _` | __|') );
  console.log('| |_) | (_| \\__ \\  __/ |_) | |_| | | | (_| |_____'   + chalk.red('/ ___ \\| | | | (_| | |_| | | (_| | |   ')  );
  console.log('|____/ \\__,_|___/\\___|_.__/ \\__,_|_|_|\\__,_|    '  + chalk.red('/_/   \\_\\_| |_|\\__, |\\__,_|_|\\__,_|_|   ') );
  console.log('                                                 '     + chalk.red('               |___/ ' + chalk.green('v' + packageJSON.version)) );    
  console.log('\n\n');

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

    if(!moduleData.notStart && moduleData.isEnabled  !== false){
      var module = require( moduleData.requireName );
      _.isFunction(module) && module(options);

    }

    !moduleData.notLogOnStart && moduleData.isEnabled  !== false && console.log( baseBuildName + useMode + category + chalk.magenta(key) + ' module as ' + chalk.magenta(value) );


  }

  console.log('\n');
}


/*
  ==========================
  Export
  ==========================
*/
module.exports = basebuildMainScript;