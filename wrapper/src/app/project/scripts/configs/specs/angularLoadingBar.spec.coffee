
'use strict'

# =============================================
# angularLoadingBar
# =============================================
describe '\nConfig: Angular Loading Bar\n', ()->

  # =============================================
  # Import modules
  # =============================================
  beforeEach module('ui.router')
  beforeEach module('ngToast')
  beforeEach module('pascalprecht.translate')
  beforeEach module('angular-loading-bar')



  # =============================================
  # Variables
  # =============================================
  angularLoadingBar = null

  # =============================================
  # Inject dependencies
  # =============================================
  beforeEach ->
    angular.module('mockProviderModule', ['angular-loading-bar']).config (_cfpLoadingBarProvider_) ->
      angularLoadingBar = _cfpLoadingBarProvider_
      spyOn(angularLoadingBar, 'includeSpinner')

    module('mockProviderModule')
    module('BaseBuildWrapper.configs')

  beforeEach inject()


  # =============================================
  # Tests
  # =============================================
  describe 'Config loading bar on BaseBuildWrapper', ->
    it 'Should enable spinner', ->
      expect(angularLoadingBar.includeSpinner).toBeTruthy()






