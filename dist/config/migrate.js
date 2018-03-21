

/**
 * Basebuild migrate module, to manage deprecated syntax
 */
var MigrateModule = function(options, mergedOptions) {
  'use strict';

  var options       = options || null,
    utilsModule     = require('../' + mergedOptions.modulesData['utils'].uses)(options),
    mergedOptions   = mergedOptions || null,
    warnedAbout     = {},
    migrateWarnings = [],
    $               = mergedOptions.plugins;
    $.chalk         = require('chalk');


  var migrateMessages = {
    soon      : 'and will be removed soon',
    soonTo    : 'and will be removed soon, use $newValue instead',
    removed   : 'and has been removed',
    removedTo : 'and has been removed, use $newValue instead',
  };


  function setup () {
  }

  function setMergedOptions(mergedOptions){
    mergedOptions = mergedOptions;
  }


  function migrate() {
    migrateGeneralOptions();
    migrateModulesOptions();
  }


  function migrateGeneralOptions(){

  }

  function migrateModulesOptions(){

    /**
     * Common settings
     */
    for(var moduleKey in mergedOptions.modulesData){

      /**
       * isEnabled has changed to "active"
       * @type {Boolean}
       */
      // migrateWarnProp({
      //   obj         : mergedOptions.modulesData[moduleKey],
      //   prop        : 'isEnabled',
      //   dotLocation : 'modulesData.' + moduleKey,
      //   msg         : getMessage({
      //     type        : 'soonTo',
      //     newValue    : 'active'
      //   })
      // });

    }


    /**
     * Proxy Module
     */

    /**
     * regexNext has changed to "nextTest"
     */
    migrateWarnProp({
      obj         : mergedOptions.modulesData['proxy'],
      prop        : 'regexNext',
      dotLocation : 'modulesData.proxy',
      value       : mergedOptions.modulesData['proxy'].regexNext,
      msg         : getMessage({
        type        : 'removedTo',
        newValue    : 'preventWhen'
      })
    });


    /**
     * next has changed to "preventWhen"
     */
    migrateWarnProp({
      obj         : mergedOptions.modulesData['proxy'],
      prop        : 'next',
      dotLocation : 'modulesData.proxy',
      value       : mergedOptions.modulesData['proxy'].next,
      msg         : getMessage({
        type        : 'removedTo',
        newValue    : 'preventWhen'
      })
    });

  }


  function getMessage (args) {
    args = args || {};
    var message = migrateMessages[args.type];

    for(key in args){
      message = message.replace('$' + key, $.chalk.red(args[key]) );
    }

    return message;
  }


  function migrateWarn(msg, prop, dotLocation) {
    if ( !warnedAbout[ msg ] ) {
      warnedAbout[ msg ] = true;
      migrateWarnings.push( msg );
      if ( console && console.warn ) {
        console.warn( utilsModule.getBaseBuildName() + $.chalk.yellow( "Migrate warning: property " + $.chalk.red(prop) + " of " + $.chalk.red(dotLocation) + " is deprecated " + msg) );
        if ( mergedOptions.migrate.trace && console.trace ) {
          console.trace();
        }
      }
    }
  }

  function migrateWarnProp( args ) {
    if ( Object.defineProperty ) {
      try {
        Object.defineProperty( args.obj, args.prop, {
          configurable: true,
          enumerable: true,
          get: function() {
            migrateWarn( args.msg, args.prop, args.dotLocation );
            return args.value;
          },
          set: function( newValue ) {
            migrateWarn( args.msg, args.prop, args.dotLocation );
            args.value = newValue;
          }
        });
        return;
      } catch( err ) {
        // IE8 is a dope about Object.defineProperty, can't warn there
      }
    }

    obj[ args.prop ] = args.value;
  }


  /**
   * API
   */
  return {
    setMergedOptions        : setMergedOptions,
    setup                   : setup,
    migrate                 : migrate,
    migrateWarn             : migrateWarn,
    migrateWarnProp         : migrateWarnProp,
    getMessage              : getMessage
  }
}


/**
 * Module exports
 */
module.exports = MigrateModule;