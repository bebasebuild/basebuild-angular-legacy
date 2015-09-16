
var _     = require('lodash');
var chalk = require('chalk');

module.exports = function(options){

  var defaultOptions = require('./defaults.js')();
  options            = _.defaultsDeep(options, defaultOptions);
  var baseBuildName  = chalk.bgWhite( chalk.black('[ ' + 'Base Build ' + chalk.red('Angular') + ' ]') ) + ' ';

  /*
    ==========================
    Read gulp files
    ==========================
  */
  for(key in options.modules){
    var value    = options.modules[key];
    var category = chalk.green(' external ');
    var useMode  = '';

    !options.modulesData[key] && (options.modulesData[key] = {});
    !options.modulesData[key].notStart ? (useMode = 'required') : (useMode = 'using');

    options.modulesData[key].requireName = value;

    if(defaultOptions.modulesData[key] && value === defaultOptions.modulesData[key].defaultValue && key != 'gulp'){
      category = chalk.cyan(' built-in ');
      !options.modulesData[key].notStart && require(value)(options);
    } else if(key === 'gulp') {
      options.modulesData[key].isDefault = false;
      !options.modulesData[key].notStart && require(value);
    } else {
      options.modulesData[key].isDefault = false;
      options.modulesData[key].requireName = process.cwd() + "/" + value;
      !options.modulesData[key].notStart && require( options.modulesData[key].requireName );
    }

    console.log( baseBuildName + useMode + category + chalk.magenta(value) + ' module');

  }
}