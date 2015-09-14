angular.module "BaseBuildWrapper.directives"
  .directive "navbar", () ->
    restrict: "EA"
    scope: {}
    templateUrl: 'app/components/navbar/template.html'
    controller: 'NavbarCtrl'