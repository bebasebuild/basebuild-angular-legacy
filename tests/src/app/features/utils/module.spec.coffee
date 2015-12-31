

  describe ' Utils Module', ->

    ###*
     * Global Variables
    ###
    rootPath             = "../../../../../../.."
    distPath             = "#{rootPath}/dist"
    basebuildNodeModules = "#{rootPath}/node_modules"
    userOptions          = 
      modulesData: 
        gulp:
          uses: '../tests/node_modules/gulp'
        
        karma:
          uses      : '../tests/node_modules/karma'
          isEnabled : no

        newModule: 
          uses: 'newModule'


    ###*
     * Imports
    ###
    _              = require "#{basebuildNodeModules}/lodash"
    defaultOptions = do require "#{distPath}/config/defaults"

    mergedOptions  = _.defaultsDeep(userOptions, defaultOptions)

    utilsModuleExports = require("#{distPath}/utils")
    utilsModule        = utilsModuleExports(mergedOptions)
    chai               = require 'chai'
    assert             = chai.assert


    ###*
     * Tests
    ###
    describe "To be a valid node module, should...", ->
      it "Returns a function on module.exports", () ->
        assert.isFunction utilsModuleExports

      it "Returns a object API when run with options", () ->
        assert.isObject utilsModule

      it "Contains utils methods as API", () ->
        assert.property utilsModule, 'requireModule'
        assert.property utilsModule, 'getTimeoutZeroName'
        assert.property utilsModule, 'getRedsparkName'
        assert.property utilsModule, 'getBaseBuildName'
        
    

    describe 'To get console names, should...', ->
      describe "Companies", ->
        
        it "Gets TimeoutZero's name", ->
          assert.equal utilsModule.getTimeoutZeroName(), '\u001b[37mTimeout\u001b[39m\u001b[36mZero\u001b[39m'

        it "Gets redspark's name", () ->
          assert.equal utilsModule.getRedsparkName(), '\u001b[37m\u001b[31mred\u001b[37mspark\u001b[39m'

      describe "Basebuild", ->
        it "Gets basebuild name to log actions", () ->
          assert.equal utilsModule.getBaseBuildName(), '\u001b[37m[ Base Build \u001b[31m\u001b[4mAngular\u001b[24m\u001b[37m ]\u001b[39m '

        it "Gets basebuild name withou '[]' wrapper", () ->
          assert.equal utilsModule.getBaseBuildName(yes), '\u001b[37mBase Build \u001b[31m\u001b[4mAngular\u001b[24m\u001b[37m\u001b[39m'
          
    describe 'To be able to require a basebuild module, should...', ->
      it 'Requires a default module', ->
        assert.isFunction  utilsModule.requireModule('scripts')

      it 'Requires a external module', ->
        assert.isFunction utilsModule.requireModule('newModule')
        
        
      
        

        

