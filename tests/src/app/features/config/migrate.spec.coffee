

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
    defaultOptions = require("#{distPath}/config/defaults")()
    _              = defaultOptions.plugins.lodash

    sinon              = require 'sinon'
    chai               = require 'chai'
    assert             = chai.assert
    expect             = chai.expect


    ###*
     * Tests
    ###
    