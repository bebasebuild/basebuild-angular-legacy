
var defaultOptions = require('./defaults.js');
var options        = null;

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


 /*
    ==========================
    Exports
    ==========================
  */
module.exports = function(options) {
  options = options;

  return {
    requireModule : requireModule
  }
}