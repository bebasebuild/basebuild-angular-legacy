

/*
  ==========================
  Exports
  ==========================
*/
module.exports = function(options) {

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

  return {
    requireModule      : requireModule,
    getBaseBuildName   : getBaseBuildName,
    getTimeoutZeroName : getTimeoutZeroName,
    getRedsparkName    : getRedsparkName
  }
}