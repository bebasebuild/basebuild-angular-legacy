
var _     = require('lodash');
var chalk = require('chalk');

module.exports = function(options){

  var defaultOptions = require('./defaults.js')();
  options            = _.defaultsDeep(options, defaultOptions);
  var baseBuildName  = chalk.bgWhite( chalk.black('[ ' + 'Base Build ' + chalk.underline.red('Angular') + ' ]') ) + ' ';

  /*
    ==========================
    Read gulp files
    ==========================
  */
  for(key in options.modules){
    var value      = options.modules[key];
    var category   = chalk.green(' external ');
    var useMode    = '';

    !options.modulesData[key] && (options.modulesData[key] = {});
    var moduleData = options.modulesData[key];

    !moduleData.notStart ? (useMode = 'required') : (useMode = 'using');

    moduleData.requireName = value;

    if(defaultOptions.modulesData[key] && value === defaultOptions.modulesData[key].defaultValue && !moduleData.isExternal){
      category = chalk.cyan(' built-in ');
      !moduleData.notStart && require(value)(options);
    } else if(key === 'gulp') {
      moduleData.isDefault = false;
      !moduleData.notStart && require(value);
    } else {
      moduleData.isDefault = false;
      moduleData.requireName = process.cwd() + "/" + value;
      !moduleData.notStart && require( moduleData.requireName );
    }

    console.log( baseBuildName + useMode + category + chalk.magenta(value) + ' module');

  }
}