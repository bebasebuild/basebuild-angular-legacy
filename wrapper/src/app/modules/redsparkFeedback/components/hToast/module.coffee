# =============================================
# Modules
# =============================================
angular.module 'hToast.controllers' , []
angular.module 'hToast.filters'     , []
angular.module 'hToast.factories'   , ['ngToast']
angular.module 'hToast.services'    , []
angular.module 'hToast.constants'   , []
angular.module 'hToast.directives'  , []
angular.module 'hToast.mocks'       , []
angular.module 'hToast.providers'   , []
angular.module 'hToast.templates'   , []
angular.module 'hToast.configs'     , []




# =============================================
# Scripts Module
# =============================================
angular.module 'hToast.scripts'     , [
  'hToast.controllers'
  'hToast.constants'
  'hToast.filters'
  'hToast.factories'
  'hToast.services'
  'hToast.directives'
  'hToast.mocks'
  'hToast.providers'
  'hToast.templates'
  'hToast.configs'
]


# =============================================
# Main Module
# =============================================
angular.module 'hToast', [
  'ngAnimate'
  'ngCookies'
  'ngTouch'
  'ngSanitize'
  'ngResource'
  'hToast.scripts'
  ]