
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
    var category = chalk.green(' external ');

    if(value === defaultOptions.modulesData[key].defaultValue && key != 'gulp'){
      category = chalk.cyan(' built-in ');
      require(value)(options);
    } else if(key === 'gulp') {
      require(value);
    } else {
      require( process.cwd() + value );
    }

    console.log( baseBuildName + ' required' + category + chalk.magenta(value) + ' module');
  }
}