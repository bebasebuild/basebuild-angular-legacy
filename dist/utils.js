
var defaultOptions = null;
var options        = null;
var chalk          = require('chalk');

function requireModule (key) {
  var moduleName = options.modulesData[key].uses;
  var data       = options.modulesData[key];
  var module     = null;

  if(data.isDefault){
    module = require(moduleName);
  } else {
    module = require(process.cwd() + moduleName);
  }

  return module;
}

function getBaseBuildName(onlyText){
  var text =  chalk.white('[ ' + 'Base Build ' + chalk.underline.red('Angular') + ' ]')  + ' ';

  if(onlyText){
    text = chalk.white( 'Base Build ' + chalk.underline.red('Angular') );
  }

  return text;
}

function getTimeoutZeroName(){
  return chalk.white('Timeout') + chalk.cyan('Zero');
}

function getRedsparkName(){
  return chalk.white( chalk.red('red')  + 'spark' )
}


/*
  ==========================
  Exports
  ==========================
*/
module.exports = function(options) {

  /*
   * Required resources
   */
  defaultOptions = options.defaultOptions;
  options        = options;

  return {
    requireModule      : requireModule,
    getBaseBuildName   : getBaseBuildName,
    getTimeoutZeroName : getTimeoutZeroName,
    getRedsparkName    : getRedsparkName
  }
}