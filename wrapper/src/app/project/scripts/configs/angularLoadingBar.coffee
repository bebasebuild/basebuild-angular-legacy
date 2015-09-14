'use strict'

# =============================================
# Module
# =============================================
angular.module 'BaseBuildWrapper.configs'

  # =============================================
  # App Config LoadingBar
  # =============================================
  .config [ 'cfpLoadingBarProvider', (cfpLoadingBarProvider) ->
    cfpLoadingBarProvider.includeSpinner = yes
    cfpLoadingBarProvider.latencyThreshold = 250
  ]
