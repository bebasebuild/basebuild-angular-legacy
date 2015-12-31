

# =============================================
# Main Module
# =============================================
angular.module 'BaseBuildWrapper'

  # =============================================
  # Config Twain
  # =============================================
  .config ($stateProvider, $urlRouterProvider) ->

    $stateProvider
      .state "tree",
        url         : "/tree"
        template    : "<h1>tree</h1>"
        controller  : ($scope) ->