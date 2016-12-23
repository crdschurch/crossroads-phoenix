(function() {
  'use strict';
  module.exports = StayLoggedInCtrl;
  StayLoggedInCtrl.$inject = ['$modalInstance', '$scope', '$interval'];
  function StayLoggedInCtrl($modalInstance, $scope, $interval) {
    var vm = this;

    vm.ok = ok;
    vm.cancel = cancel;
    vm.modal = $modalInstance;

    function ok() {
      $modalInstance.close();
    }

    function cancel() {
      $modalInstance.dismiss('cancel');
    }
  }
})();
