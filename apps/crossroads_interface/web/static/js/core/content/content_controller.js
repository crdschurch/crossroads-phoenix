'use strict';
module.exports = function($rootScope, $scope, $state, $stateParams, $log, ContentPageService, $sce) {
  $scope.main = 'ContentCtrl';
  $scope.params = $stateParams;
  $scope.page = ContentPageService.page;
  $scope.pageContent = ContentPageService.page.content;
  $scope.sidebarPage = ContentPageService.page.sidebarContent;

};
