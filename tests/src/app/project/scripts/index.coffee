
angular.module 'BaseBuildTests.vendors' , [
  'ngAnimate'
  'ngCookies'
  'ngTouch'
  'ngSanitize'
  'ngResource'
  'ui.router'
  'ui.bootstrap'
  'oitozero.ngSweetAlert'
  'ngToast'
  'angular-loading-bar'
]

# =============================================
# Modules
# =============================================
angular.module 'BaseBuildTests.controllers' , ['BaseBuildTests.vendors']
angular.module 'BaseBuildTests.filters'     , ['BaseBuildTests.vendors']
angular.module 'BaseBuildTests.factories'   , ['BaseBuildTests.vendors']
angular.module 'BaseBuildTests.constants'   , ['BaseBuildTests.vendors']
angular.module 'BaseBuildTests.services'    , ['BaseBuildTests.vendors']
angular.module 'BaseBuildTests.directives'  , ['BaseBuildTests.vendors']
angular.module 'BaseBuildTests.mocks'       , ['BaseBuildTests.vendors']
angular.module 'BaseBuildTests.i18n'        , ['BaseBuildTests.vendors']
angular.module 'BaseBuildTests.configs'     , ['BaseBuildTests.vendors']
angular.module 'BaseBuildTests.providers'   , ['BaseBuildTests.vendors']



# =============================================
# Scripts Module
# =============================================
angular.module 'BaseBuildTests.scripts'     , [
  'BaseBuildTests.controllers'
  'BaseBuildTests.constants'
  'BaseBuildTests.filters'
  'BaseBuildTests.factories'
  'BaseBuildTests.services'
  'BaseBuildTests.directives'
  'BaseBuildTests.mocks'
  'BaseBuildTests.i18n'
  'BaseBuildTests.providers'
  'BaseBuildTests.configs'
]


# =============================================
# Main Module
# =============================================
angular.module 'BaseBuildTests', [
  'BaseBuildTests.scripts'
  'BaseBuildTests.vendors'
]