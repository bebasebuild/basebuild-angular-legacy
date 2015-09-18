
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

function getBaseBuildName(){
  return chalk.bgWhite( chalk.black('[ ' + 'Base Build ' + chalk.underline.red('Angular') + ' ]') ) + ' ';
}


/*
  ==========================
  Exports
  ==========================
*/
module.exports = function(options) {
  options        = options;
  defaultOptions = require('./defaults.js')(options);

  return {
    requireModule    : requireModule,
    getBaseBuildName : getBaseBuildName
  }
}