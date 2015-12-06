# =============================================
# Modules
# =============================================
# angular.module 'hQueue.controllers' , []
# angular.module 'hQueue.filters'     , []
# angular.module 'hQueue.factories'   , []
angular.module 'hTimer.services'    , []
# angular.module 'hQueue.constants'   , []
# angular.module 'hQueue.directives'  , []
# angular.module 'hQueue.mocks'       , []
# angular.module 'hQueue.providers'   , []
# angular.module 'hQueue.templates'   , []
# angular.module 'hQueue.configs'     , []




# =============================================
# Scripts Module
# =============================================
angular.module 'hTimer.scripts'     , [
  # 'hQueue.controllers'
  # 'hQueue.constants'
  # 'hQueue.filters'
  # 'hQueue.factories'
  'hTimer.services'
  # 'hQueue.directives'
  # 'hQueue.mocks'
  # 'hQueue.providers'
  # 'hQueue.templates'
  # 'hQueue.configs'
]


# =============================================
# Main Module
# =============================================
angular.module 'hTimer', [
  'ngSanitize'
  'ngResource'
  'hTimer.scripts'
  ]