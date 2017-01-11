(function(){
  'use strict';

  module.exports = HostConfirmCtrl;

  HostConfirmCtrl.$inject = ['$state', 'Responses', '$rootScope'];

  function HostConfirmCtrl($state, Responses, $rootScope) {

    var vm = this;
    vm.showDashboard = showDashboard;
    vm.successMessage = successMessage;
    vm.responses = Responses;


    if (vm.responses.data.completed_flow !== true) {
      $state.go('group_finder.host.questions');
    }

    Responses.clear();

    function showDashboard() {
      $state.go('group_finder.dashboard');
    }

    function successMessage() {
      var message = $rootScope.MESSAGES.groupFinderHostPublicGroup.content;
      if (vm.responses.data.open_spots <= 0) {
        message = $rootScope.MESSAGES.groupFinderHostPrivateGroup.content;
      }
      return message;
    }
  }

})();
