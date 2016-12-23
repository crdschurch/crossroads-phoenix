(function () {
  'use strict';

  module.exports = HostCtrl;

  HostCtrl.$inject = ['Responses', '$scope', '$state'];

  function HostCtrl (Responses, $scope, $state) {
    $scope.currentStep = 1;

    var vm = this;

    vm.start = start;

    function start() {
      Responses.started = true;
      $state.go('group_finder.host.questions');
    }
  }

})();
