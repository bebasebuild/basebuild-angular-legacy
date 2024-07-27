# =============================================
# Modules
# =============================================
# angular.module 'objectToArray.controllers' , []
angular.module 'objectToArray.filters'     , []
# angular.module 'objectToArray.factories'   , []
# angular.module 'objectToArray.services'    , []
# angular.module 'objectToArray.constants'   , []
# angular.module 'objectToArray.directives'  , []
# angular.module 'objectToArray.mocks'       , []
# angular.module 'objectToArray.providers'   , []
# angular.module 'objectToArray.templates'   , []
# angular.module 'objectToArray.configs'     , []




# =============================================
# Scripts Module
# =============================================
angular.module 'objectToArray.scripts'     , [
  # 'objectToArray.controllers'
  # 'objectToArray.constants'
  'objectToArray.filters'
  # 'objectToArray.factories'
  # 'objectToArray.services'
  # 'objectToArray.directives'
  # 'objectToArray.mocks'
  # 'objectToArray.providers'
  # 'objectToArray.templates'
  # 'objectToArray.configs'
]


# =============================================
# Main Module
# =============================================
angular.module 'objectToArray', [
  'ngAnimate'
  'ngCookies'
  'ngTouch'
  'ngSanitize'
  'ngResource'
  'objectToArray.scripts'
  ]