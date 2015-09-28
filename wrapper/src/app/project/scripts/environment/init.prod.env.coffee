$(document).ready ->

  window.baseBuildWrapperEnv or= {}
  setupData              = {}
  waitForSetup           = false
  baseBuildWrapperEnv    = window.baseBuildWrapperEnv
  window.baseBuildWrapperEnv.user = null

  # Bootstrap da aplicação
  bootstrap = ->
    console.log('init.prod')
    angular.bootstrap(document, ['BaseBuildWrapper'])
    return

  bootstrap()
