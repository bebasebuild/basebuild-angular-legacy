

/**
 * Basebuild config module, to setup everything before start working
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
  
  /**
   Prepares options to start
   * @param  {Object} options user options
   * @return {Object} user options, merged with default options and analyzed by necessary files
   */
  function setup (options) {
    options = mergeWithDefaultOptions(options);

    // Set default options in global options to never require ./defaults.js more than once
    options.defaultOptions = defaultOptions;

    return options;
  }

  /**
   Merges user options with default
   * @param  {Object} options user options
   * @param  {Object} options merged with default options 
   */
  function mergeWithDefaultOptions (options) {
    return _.defaultsDeep(options, defaultOptions);
  }


  /**
   * API
   */
  return {
    defaultOptions          : defaultOptions,
    setup                   : setup,
    mergeWithDefaultOptions : mergeWithDefaultOptions
  }
}


/**
 * Module exports
 */
module.exports = ConfigModule;