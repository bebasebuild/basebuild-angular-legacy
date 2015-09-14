
# =============================================
# Modules
# =============================================
angular.module('hToast')

  # =============================================
  # ngToastProvider Config
  # =============================================
  .config ['ngToastProvider',
    (ngToastProvider) ->

      ngToastProvider.configure
        additionalClasses: 'animated fast flipInY'

  ]