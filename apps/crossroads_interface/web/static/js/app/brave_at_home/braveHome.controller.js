(function () {
  'use strict';
  module.exports = BraveHomeController;

  BraveHomeController.$inject = ['$scope', '$rootScope', '$window', '$stateParams', '$log', '$location', '$anchorScroll', 'Session', '$state'];

function BraveHomeController($scope, $rootScope, $window, $stateParams, $log, $location, $anchorScroll, Session, $state) {
		var vm = this;

    var userid = Session.exists('userId') !== undefined ? Session.exists('userId') : 0;
    //var emailaddress = Session.exists('email') !== undefined ? Session.exists('email') : 0;
    var username = Session.exists('username') !== undefined ? Session.exists('username') : 0;

    $scope.bravePage = $state.current.data.bravePage;

    $scope.$watch(function(){
      return $state.current.data;
    }, function(p){
      //$scope.itemId = p.itemId;
      $scope.bravePage = p.bravePage;
    });
	};
})()
