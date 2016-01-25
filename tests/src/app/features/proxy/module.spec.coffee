

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
    error        = null

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
        module                 = moduleExports(mergedOptions)
        proxyRequest.setHeader = sinon.stub()
        sinon.stub(console, 'log') 
        req                    = url: '/xpto'
        res                    = {}
        
        # Execute
        module.onProxyRequest(proxyRequest, req, res)

      afterEach ->
        proxyRequest.setHeader.reset()
        console.log.restore()

      it 'Sets CORS headers', ->
        assert.isTrue proxyRequest.setHeader.calledOnce
      
      it 'Logs', ->
        assert.isTrue console.log.calledOnce

    describe 'On proxy error', ->

      beforeEach ->
        sinon.stub(console, 'error') 
        module                 = moduleExports(mergedOptions)
        req                    = url: 'xpto'
        res                    = {
          writeHead : sinon.stub()
        }
        error                  = 'Cannot connect'
        
        # Execute
        module.onProxyError(error, req, res)
      
      afterEach ->
        console.error.restore()
      
      it 'Writes head', ->
        assert.isTrue res.writeHead.calledOnce

      it 'Logs', -> 
        assert.isTrue console.error.calledOnce
    
      
        

        

