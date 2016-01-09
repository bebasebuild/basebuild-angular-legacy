

/**
 * Basebuild migrate module, to prevent 
 */
var MigrateModule = function(options, mergedOptions) {
  var options       = options || null,
    utilsModule     = require('../' + mergedOptions.modulesData['utils'].uses)(options),
    mergedOptions   = mergedOptions || null,
    warnedAbout     = {},
    migrateWarnings = [],
    $               = mergedOptions.plugins;  


  var migrateMessages = {
    soon      : '($dotLocation) and will be removed soon',
    soonTo    : '($dotLocation) and will be removed soon, use $newValue instead',
    removed   : '($dotLocation) has been removed',
    removedTo : '($dotLocation) has been removed, use $newValue instead',
  };


  function setup () {
  }

  function setMergedOptions(mergedOptions){
    mergedOptions = mergedOptions; 
  }


  function migrate() {
    migrateWarnProp({
      obj         : mergedOptions.modulesData['scripts'],
      prop        : 'isEnabled',
      msg         : getMessage({
        type        : 'soonTo',
        dotLocation : 'modulesData.scripts',
        newValue    : 'active'
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


  function migrateWarn(msg, prop) {
    if ( !warnedAbout[ msg ] ) {
      warnedAbout[ msg ] = true;
      migrateWarnings.push( msg );
      if ( console && console.warn ) {
        console.warn( utilsModule.getBaseBuildName() + $.chalk.yellow( "Migrate warning: " + $.chalk.red(prop) + " is deprecated " + msg) );
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
            migrateWarn( args.msg, args.prop );
            return args.value;
          },
          set: function( newValue ) {
            migrateWarn( args.msg, args.prop );
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