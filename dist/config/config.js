
var _              = require('lodash')
var defaultsDeep   = _.partialRight(_.merge, function recursiveDefaults () {
  // Ensure dates and arrays are not recursively merged
  if (_.isArray(arguments[0]) || _.isDate(arguments[0])) {
    return arguments[0]
  }
  return _.merge(arguments[0], arguments[1], recursiveDefaults)
})

/**
 * Basebuild config module, to setup everything before start working
 */
var ConfigModule = function() {

  /*
   * Required resources
   */
  var defaultOptions = require('./defaults.js')(),
      chalk          = require('chalk'),
      migrateModule  = null



  /*
   * Methods
   */

  /**
   * @description Prepares options to start
   * @param  {Object} options user options
   * @return {Object} user options, merged with default options and analyzed by necessary files
   */
  function setup (options) {
    var userOptions = options
    options = mergeWithDefaultOptions(options)

    // Set default options in global options to never require ./defaults.js more than once
    options.defaultOptions = defaultOptions

    migrateModule = require('./migrate.js')(userOptions, options)
    migrateModule.setup()
    migrateModule.migrate()

    return options
  }

  /**
   * @description Merges user options with default
   * @param  {Object} options user options
   * @param  {Object} options merged with default options
   */
  function mergeWithDefaultOptions (options) {
    return defaultsDeep(options, defaultOptions)
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
module.exports = ConfigModule