

module.exports = function(userOptions){


  var defaultOptions = require('./defaults.js');
  _.defaultsDeep(userOptions, defaultOptions);

  /*
    ==========================
    Read gulp files
    ==========================
  */
  for(key in userOptions.modules){
    var value = userOptions.modules[key];
    require(value)(userOptions);
  }

  // wrench.readdirSyncRecursive('./node_modules/basebuild-angular/dist').filter(function(file) {
  //   return (/\.(js|coffee)$/i).test(file);
  // }).map(function(file) {
  //   require('./node_modules/basebuild-angular/dist/' + file)(userOptions);
  // });
}