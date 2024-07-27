'use strict'

# =============================================
# hToast
# =============================================
describe '\n[hToast] Factory: hToast\n', ()->

  # =============================================
  # Import modules
  # =============================================
  beforeEach module('hToast.scripts')
  beforeEach module('ngToast')


  # =============================================
  # Variables
  # =============================================
  hToast    = null
  ngToast   = null

  # =============================================
  # Inject dependencies
  # =============================================
  beforeEach inject (_hToast_, _ngToast_) ->
    hToast  = _hToast_
    ngToast = _ngToast_

  # =============================================
  # Tests
  # =============================================
  describe 'Method: alert', ->
    beforeEach ->
      spyOn(ngToast, 'create')

    it 'Should define default values when pass no options', ->

      hToast.alert()

      expect(ngToast.create).toHaveBeenCalledWith({})

    it 'Should create a notification calling ngToast.create() with parameter options', ->
      options =
        message: 'default message'

      hToast.alert(options)

      expect(ngToast.create).toHaveBeenCalledWith( jasmine.objectContaining(options) )

  describe 'Method: generic', ->

    beforeEach ->
      spyOn(hToast, 'alert')

    it 'Should define default values when pass no options', ->
      defaultValues =
        content   : undefined
        className : undefined

      hToast.generic()

      expect(hToast.alert)
        .toHaveBeenCalledWith( jasmine.objectContaining(defaultValues) )

    it 'Should force className and message parameters', ->
      rightMessage   = 'rightMessage'
      rightClassName = 'rightClassName'

      wrongOptions  =
        content   : 'wrongMessage'
        className : 'wrongClassName'

      hToast.generic(rightClassName, rightMessage, wrongOptions)

      expect(hToast.alert)
        .toHaveBeenCalledWith(
          jasmine.objectContaining
            content   : rightMessage
            className : rightClassName
        )

  describe 'Methods of some type', ->
    beforeEach ->
      spyOn(hToast, 'generic')

    it 'Should call genericMethod with default "info" type parameters', ->
      hToast.info()
      expect(hToast.generic).toHaveBeenCalledWith('info', undefined, undefined)

    it 'Should call genericMethod with default "success" type parameters', ->
      hToast.success()
      expect(hToast.generic).toHaveBeenCalledWith('success', undefined, undefined)

    it 'Should call genericMethod with default "warning" type parameters', ->
      hToast.warning()
      expect(hToast.generic).toHaveBeenCalledWith('warning', undefined, undefined)

    it 'Should call genericMethod with default "danger" type parameters', ->
      hToast.error()
      expect(hToast.generic).toHaveBeenCalledWith('danger', undefined, undefined)














