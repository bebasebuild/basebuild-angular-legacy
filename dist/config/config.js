

/**
 * Basebuild utils module, to work with common module's functions 
 * @param {Object} options Merged options between default and user options
 */
var ConfigModule = function() {

  /*
   * Required resources
   */
  var defaultOptions = require('./defaults.js')();
  var chalk          = require('chalk');
  var _              = require('lodash');



  /*
   * Methods
   */
  function mergeWithDefaultOptions (options) {
    options = _.defaultsDeep(options, defaultOptions);

    // Set default options in global options to never require ./defaults.js more than once
    options.defaultOptions = defaultOptions;

    return options;
  }


  /**
   * API
   */
  return {
    defaultOptions          : defaultOptions,
    mergeWithDefaultOptions : mergeWithDefaultOptions
  }
}


/**
 * Module exports
 */
module.exports = ConfigModule;