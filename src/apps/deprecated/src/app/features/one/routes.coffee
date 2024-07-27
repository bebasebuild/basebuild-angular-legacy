

# =============================================
# Main Module
# =============================================
angular.module 'BaseBuildWrapper'

  # =============================================
  # Config Twain
  # =============================================
  .config ($stateProvider, $urlRouterProvider) ->

    $stateProvider
      .state "one",
        url         : "/one"
        template    : "<h1>One</h1>"
        controller  : ($scope) ->