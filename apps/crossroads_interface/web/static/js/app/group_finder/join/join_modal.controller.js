(function() {
  'use strict';

  module.exports = JoinModalCtrl;

  JoinModalCtrl.$inject = ['$scope', '$state', '$modalInstance'];

  function JoinModalCtrl($scope, $state, $modalInstance) {
    var vm = this;
    vm.join = function() {
      // TODO integrate person -> group service here
      $modalInstance.close($scope.confirmed = true);
      $scope.error = false;
      $state.go('^.complete');
    };

    vm.cancel = function() {
      $modalInstance.close();
    };
  }
})();
