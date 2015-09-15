
var _     = require('lodash');
var chalk = require('chalk');

module.exports = function(options){

  var defaultOptions = require('./defaults.js')();
  options            = _.defaultsDeep(options, defaultOptions);
  var baseBuildName  = chalk.bgWhite( chalk.black('[ ' + 'Base Build ' + chalk.red('Angular') + ' ]') );

  /*
    ==========================
    Read gulp files
    ==========================
  */
  for(key in options.modules){
    var value    = options.modules[key];
    var category = '';

    if(value === defaultOptions.modulesData[key].defaultValue){
      category = chalk.cyan(' default ');
      require(value)(options);
    } else if(key != 'gulp'){
      category = chalk.blue(' external ');
      require( process.cwd() + value )
    }

    console.log( baseBuildName + ' required' + category + chalk.magenta(value) + ' module');
  }
}