

  describe 'Default Options', ->

    ###*
     * Global Variables
    ###
    rootPath             = "../../../../../../.."
    distPath             = "#{rootPath}/dist"
    basebuildNodeModules = "#{rootPath}/node_modules"

    ###*
     * Imports
    ###
    defaultOptions = require("#{distPath}/defaults")()
    _              = defaultOptions.plugins.lodash

    sinon              = require 'sinon'
    chai               = require 'chai'
    assert             = chai.assert


    ###*
     * Tests
    ###
    describe 'Provides a default error handler: ', ->
      beepStup = null
      logStub  = null

      beforeEach ->
        logStub  = defaultOptions.plugins.util.log  = sinon.stub()
        beepStup = defaultOptions.plugins.util.beep = sinon.stub()

      afterEach ->
        logStub.reset()
        beepStup.reset()


      it 'Returns a function when invoked to be a callback on tasks errors', ->
        assert.isFunction defaultOptions.errorHandler('TitleX')

      it 'Uses a custom title to track the error', ->
        cleanCustomTitle  = 'MycleanCustomTitle'
        redCustomTitle    = '\u001b[31m[' + cleanCustomTitle + ']\u001b[39m'
        errorMessage      = 'ErrorXPTO'
        
        errorHandler = defaultOptions.errorHandler(cleanCustomTitle)
        
        errorHandler(errorMessage)

        assert.isTrue logStub.calledOnce
        assert.isTrue logStub.calledWith(redCustomTitle, errorMessage)

      it 'Beeps the terminal to alert the developer', ->
        
        defaultOptions.errorHandler('whatever')('error')
        defaultOptions.plugins.util.log  = sinon.stub()
        

        assert.isTrue beepStup.called

      it 'Emits end of the stream when invoked', ->
        @emit = () ->
        sinon.stub(@, 'emit')

        errorHandler = defaultOptions.errorHandler('whatever')
        errorHandler.apply(@, ['error'])

        assert.isTrue @emit.calledWith('end')
        @emit.reset()

      
        

      