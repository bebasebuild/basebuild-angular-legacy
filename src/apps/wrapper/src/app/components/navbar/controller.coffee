angular.module "BaseBuildWrapper.controllers"
.controller "NavbarCtrl", ($rootScope, $scope, $state, $modal, hAlert, hGATracker) ->

  $scope.attrs =
    modalIsActive : no

  $scope.actions =
    trackModals: (action, open)->
      hGATracker.trackEvent {
        eventCategory: "Navbar"
        eventAction: action
        eventLabel: if open then "Open" else "Close"
      }

    goToHome: ->
      $state.go('home') if confirm

  ##################################
  ## Init
  ##################################



