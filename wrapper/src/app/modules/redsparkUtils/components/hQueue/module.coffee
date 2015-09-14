# =============================================
# Modules
# =============================================
# angular.module 'hQueue.controllers' , []
# angular.module 'hQueue.filters'     , []
# angular.module 'hQueue.factories'   , []
# angular.module 'hQueue.services'    , []
# angular.module 'hQueue.constants'   , []
# angular.module 'hQueue.directives'  , []
# angular.module 'hQueue.mocks'       , []
# angular.module 'hQueue.providers'   , []
# angular.module 'hQueue.templates'   , []
angular.module 'hQueue.configs'     , []




# =============================================
# Scripts Module
# =============================================
angular.module 'hQueue.scripts'     , [
  # 'hQueue.controllers'
  # 'hQueue.constants'
  # 'hQueue.filters'
  # 'hQueue.factories'
  # 'hQueue.services'
  # 'hQueue.directives'
  # 'hQueue.mocks'
  # 'hQueue.providers'
  # 'hQueue.templates'
  'hQueue.configs'
]


# =============================================
# Main Module
# =============================================
angular.module 'hQueue', [
  'ngAnimate'
  'ngCookies'
  'ngTouch'
  'ngSanitize'
  'ngResource'
  'hQueue.scripts'
  ]