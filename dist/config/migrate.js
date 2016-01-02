

/**
 * Basebuild config module, to setup everything before start working
 */
var MigrateModule = function(options) {
  var options = options || null;


  function setup (mergedOptions) {
    options = mergedOptions;
  }

  function readDotNotation (property) {
    properties = property.split('.');
    
    for (var i = 0; i < properties.length; i++) {
      properties[i];
    };
  }


  function migrate() {

  }


  function migrateFrom (from, to) {
    
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
module.exports = MigrateModule;