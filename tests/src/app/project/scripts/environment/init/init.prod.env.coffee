$(document).ready ->

  window.BaseBuildTestsEnv or= {}
  setupData              = {}
  waitForSetup           = false
  BaseBuildTestsEnv    = window.BaseBuildTestsEnv
  window.BaseBuildTestsEnv.user = null

  # Bootstrap da aplicação
  bootstrap = ->
    console.log('init.prod')
    angular.bootstrap(document, ['BaseBuildTests'])
    return

  bootstrap()
