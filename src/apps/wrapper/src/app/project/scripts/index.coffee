
angular.module 'BaseBuildWrapper.vendors' , [
  'ngAnimate'
  'ngCookies'
  'ngTouch'
  'ngSanitize'
  'ngResource'
  'ui.router'
  'ui.bootstrap'
  'oitozero.ngSweetAlert'
  'hQueue'
  'hAnalytics'
  'ngToast'
  'angular-loading-bar'
  'objectToArray'
]

# =============================================
# Modules
# =============================================
angular.module 'BaseBuildWrapper.controllers' , ['BaseBuildWrapper.vendors']
angular.module 'BaseBuildWrapper.filters'     , ['BaseBuildWrapper.vendors']
angular.module 'BaseBuildWrapper.factories'   , ['BaseBuildWrapper.vendors']
angular.module 'BaseBuildWrapper.constants'   , ['BaseBuildWrapper.vendors']
angular.module 'BaseBuildWrapper.services'    , ['BaseBuildWrapper.vendors']
angular.module 'BaseBuildWrapper.directives'  , ['BaseBuildWrapper.vendors']
angular.module 'BaseBuildWrapper.mocks'       , ['BaseBuildWrapper.vendors']
angular.module 'BaseBuildWrapper.i18n'        , ['BaseBuildWrapper.vendors']
angular.module 'BaseBuildWrapper.configs'     , ['BaseBuildWrapper.vendors']
angular.module 'BaseBuildWrapper.providers'   , ['BaseBuildWrapper.vendors']



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
  'BaseBuildWrapper.scripts'
  'BaseBuildWrapper.vendors'
]