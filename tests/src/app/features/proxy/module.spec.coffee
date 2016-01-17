

  describe ' Proxy Module', ->

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
          isEnabled : no



    ###*
     * Imports
    ###
    _              = require "#{basebuildNodeModules}/lodash"
    defaultOptions = do require "#{distPath}/config/defaults"

    mergedOptions  = _.defaultsDeep(userOptions, defaultOptions)

    moduleExports = require("#{distPath}/proxy")
    module        = null

    sinon         = require 'sinon'
    chai          = require 'chai'
    assert        = chai.assert

    logStub      = null
    proxyRequest = {}
    req          = null
    res          = null

    ###*
     * Tests
    ###
    describe "To be a valid node module, should...", ->
      beforeEach ->
        module = moduleExports(mergedOptions)

      it "Returns a function on module.exports", () ->
        assert.isFunction moduleExports

      it "Returns a object API when run with options", () ->
        assert.isObject module

      it "Contains methods and attributes as API", () ->
        assert.property module, 'middlewares'

    describe 'On proxy request', ->
      

      beforeEach ->
        module       = moduleExports(mergedOptions)
        proxyRequest.setHeader = sinon.stub()
        logStub      = console.log = sinon.stub() 
        req          = url: 'xpto'
        res          = {}
      
      afterEach ->
        proxyRequest.setHeader.reset()
        logStub.reset()
      
      it 'Sets CORS headers', ->
        module.onProxyRequest(proxyRequest, req, res)
        assert.isTrue proxyRequest.setHeader.calledOnce
    
      
        

        

