describe('Scripts Module', function () {
  
  
  /*
   * Global Variables
   */
  var rootPath = "../../../../../../../..";
  var distPath = [rootPath, '/dist'].join('');
  var basebuildNodeModules = [rootPath, '/node_modules'].join('');
  var userOptions = {
    modulesData: {
      gulp: {
        uses: '../tests/node_modules/gulp'
      },
      karma: {
        uses: '../tests/node_modules/karma',
        isEnabled: false
      }
    }
  }
  
  
  /*
   * Imports
   */
  var _ = require([basebuildNodeModules, '/lodash'].join(''));
  var defaultOptions = require([distPath, '/config/defaults'].join(''))();
  
  var mergedOptions = _.defaultsDeep(userOptions, defaultOptions);
  
  var scriptsModuleExports = require([distPath, '/scripts'].join(''));
  var scriptsModule = scriptsModuleExports(mergedOptions);
  var chai = require('chai');
  var assert = chai.assert;
  
  var fs = require('fs');
  
  describe('When there is a .js file', function() {
    
    beforeEach(function (done) {
      var stream = scriptsModule.buildScripts({
        src: 'app/**/*.js',
        dist: mergedOptions.tmp,
        buildOptions: mergedOptions
      });
      
      stream.on('finish', function() {
        done();
      });
    });
    
    
    it('Should compile ES6 features to ES5', function(done) {
      fs.readFile([mergedOptions.tmp, '/serve/app/features/scripts/es6/es6.js'].join(''), {encoding: 'utf8'}, callbackTest);
      
      function callbackTest(error, data) {
        var hasVarArray1RegExp = /var\sarray1\s=\s\[1,\s2,\s3];/;
        var hasVarArray2RegExp = /var\sarray2\s=\s\[\].concat\(array1\);/;
        var hasFunctionRegExp = /var\sfn\s=\sfunction\sfn\(\)\s\{\};/;
        
        var hasConstRegExp = /const\sarray/;
        var hasSpreadOperatorRegExp = /\[\.\.\.array1\];/;
        var hasArrowFunctionRegExp = /\(\)=>\s\{/;
        
        assert.isTrue(hasVarArray1RegExp.test(data));
        assert.isTrue(hasVarArray2RegExp.test(data));
        assert.isTrue(hasFunctionRegExp.test(data));
        
        assert.isFalse(hasConstRegExp.test(data));
        assert.isFalse(hasSpreadOperatorRegExp.test(data));
        assert.isFalse(hasArrowFunctionRegExp.test(data));
        
        done();
      }
    })
    
  });
  
});
