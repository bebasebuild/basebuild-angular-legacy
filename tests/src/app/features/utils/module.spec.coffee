

  describe 'Sample', ->

    ###*
     * Global Variables
    ###
    distPath = '../../../../../../../dist'


    ###*
     * Imports
    ###
    defaultOptions = do require "#{distPath}/defaults"
    utilsModule    = require("#{distPath}/utils")(defaultOptions)
    chai           = require 'chai'
    assert         = chai.assert


    ###*
     * Tests
    ###
    describe 'To get console names, should...', ->
      it 'Get TimeoutZero name', ->
        assert.equal utilsModule.getTimeoutZeroName(), '\u001b[37mTimeout\u001b[39m\u001b[36mZero\u001b[39m'

        

