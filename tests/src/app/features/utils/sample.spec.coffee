

describe 'Sample', ->

  ###*
   * Global Variables
  ###
  APP_ENV = null
  utils   = require('/../dist/utils.js') 
  console.log('spec: utils.. ', utils)

  ###*
   * Imports 
  ###
  beforeEach -> module('BaseBuildTests.constants')
  beforeEach inject (_APP_ENV_) -> APP_ENV = _APP_ENV_


  ###*
   * Tests
  ###
  describe 'maOe', ->
    it 'Shoud be true', ->
      expect(yes).toEqual yes
      
    
  