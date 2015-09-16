
var defaultOptions = require('./defaults.js');
var options        = null;

function requireModule (key) {
  var moduleName = options.modules[key];
  var data       = options.modulesData[key];
  var module     = null;

  if(data.isDefault){
    module = require(moduleName);
  } else {
    module = require(process.cwd() + moduleName);
  }
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