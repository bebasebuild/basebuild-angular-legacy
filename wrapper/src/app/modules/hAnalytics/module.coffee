# =============================================
# Modules
# =============================================
# angular.module 'hAnalytics.controllers' , []
# angular.module 'hAnalytics.filters'     , []
# angular.module 'hAnalytics.factories'   , []
angular.module 'hAnalytics.services'    , ['hTimer']
# angular.module 'hAnalytics.constants'   , []
# angular.module 'hAnalytics.directives'  , []
# angular.module 'hAnalytics.mocks'       , []
angular.module 'hAnalytics.providers'   , []



# =============================================
# Scripts Module
# =============================================
angular.module 'hAnalytics.scripts'     , [
  # 'hAnalytics.controllers'
  # 'hAnalytics.filters'
  # 'hAnalytics.factories'
  'hAnalytics.services'
  # 'hAnalytics.constants'
  # 'hAnalytics.directives'
  # 'hAnalytics.mocks'
  'hAnalytics.providers'
]


# =============================================
# Main Module
# =============================================
angular.module 'hAnalytics', [
  'ngSanitize'
  'ngResource'
  'hAnalytics.scripts'
]