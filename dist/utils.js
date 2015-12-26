

/**
 * Basebuild utils module, to work with common module's functions 
 * @param {Object} options Merged options between default and user options
 */
var UtilsModule = function(options) {

  /*
   * Required resources
   */
  var defaultOptions = options.defaultOptions;
  var chalk          = options.plugins.chalk;



  /*
   * Methods
   */

  /**
   * Requires a basebuild module
   * @param  {String} key module name
   * @return {Function} module
   */
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


  /**
   * Get colored basebuild name
   * @param  {Booles} onlyText if true so will return the name without '[]' wrapper
   * @return {String} basebuild name
   */
  function getBaseBuildName(onlyText){
    var text =  chalk.white('[ ' + 'Base Build ' + chalk.underline.red('Angular') + ' ]')  + ' ';

    if(onlyText){
      text = chalk.white( 'Base Build ' + chalk.underline.red('Angular') );
    }

    return text;
  }

  /**
   * Get colored TimeoutZero's name
   * @return {String} TimeoutZero's name
   */
  function getTimeoutZeroName(){
    return chalk.white('Timeout') + chalk.cyan('Zero');
  }


  /**
   * Get colored redspark's name
   * @return {String} redspark's name
   */
  function getRedsparkName(){
    return chalk.white( chalk.red('red')  + 'spark' )
  }


  /**
   * API
   */
  return {
    requireModule      : requireModule,
    getBaseBuildName   : getBaseBuildName,
    getTimeoutZeroName : getTimeoutZeroName,
    getRedsparkName    : getRedsparkName
  }
}


/**
 * Module exports
 */
module.exports = UtilsModule;