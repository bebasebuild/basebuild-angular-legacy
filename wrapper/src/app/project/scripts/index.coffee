
# =============================================
# Modules
# =============================================
angular.module 'BaseBuildWrapper.controllers' , []
angular.module 'BaseBuildWrapper.filters'     , []
angular.module 'BaseBuildWrapper.factories'   , ['oitozero.ngSweetAlert']
angular.module 'BaseBuildWrapper.constants'   , []
angular.module 'BaseBuildWrapper.services'    , []
angular.module 'BaseBuildWrapper.directives'  , []
angular.module 'BaseBuildWrapper.mocks'       , []
angular.module 'BaseBuildWrapper.i18n'        , []
angular.module 'BaseBuildWrapper.configs'     , ['angular-loading-bar']
angular.module 'BaseBuildWrapper.providers'   , []



# =============================================
# Scripts Module
# =============================================
angular.module 'BaseBuildWrapper.scripts'     , [
  'BaseBuildWrapper.controllers'
  'BaseBuildWrapper.constants'
  'BaseBuildWrapper.filters'
  'BaseBuildWrapper.factories'
  'BaseBuildWrapper.services'
  'BaseBuildWrapper.directives'
  'BaseBuildWrapper.mocks'
  'BaseBuildWrapper.i18n'
  'BaseBuildWrapper.providers'
  'BaseBuildWrapper.configs'
]


# =============================================
# Main Module
# =============================================
angular.module 'BaseBuildWrapper', [
  'ngAnimate'
  'ngCookies'
  'ngTouch'
  'ngSanitize'
  'ngResource'
  'ui.router'
  'ui.bootstrap'
  'oitozero.ngSweetAlert'
  'BaseBuildWrapper.scripts'
  'hQueue'
  'hAnalytics'
  'ngToast'
  'angular-loading-bar'
  'objectToArray'
  ]