
var _ = require('lodash');

module.exports = function(options){


  var defaultOptions = require('./defaults.js')();
  options = _.defaultsDeep(options, defaultOptions);

  /*
    ==========================
    Read gulp files
    ==========================
  */
  for(key in options.modules){
    var value = options.modules[key];
    if(/^.\//.test(value)){
      console.log('[Base Build Angular] required' + value + ' module');
      require(value)(options);
    }
  }

  // wrench.readdirSyncRecursive('./node_modules/basebuild-angular/dist').filter(function(file) {
  //   return (/\.(js|coffee)$/i).test(file);
  // }).map(function(file) {
  //   require('./node_modules/basebuild-angular/dist/' + file)(options);
  // });
}