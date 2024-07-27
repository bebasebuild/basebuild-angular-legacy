

# =============================================
# Main Module
# =============================================
angular.module 'BaseBuildWrapper'

  # =============================================
  # Config Twain
  # =============================================
  .config ($stateProvider, $urlRouterProvider) ->

    $stateProvider
      .state "two",
        url         : "/two"
        template    : "<h1>two</h1>"
        controller  : ($scope) ->