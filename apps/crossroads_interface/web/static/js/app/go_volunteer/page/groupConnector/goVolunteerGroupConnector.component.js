(function() {
  'use strict';

  module.exports = GoVolunteerGroupConnector;

  GoVolunteerGroupConnector.$inject = ['GoVolunteerService'];

  function GoVolunteerGroupConnector(GoVolunteerService) {
    return {
      restrict: 'E',
      scope: {
        onSubmit: '&'
      },
      bindToController: true,
      controller: GoVolunteerGroupConnectorController,
      controllerAs: 'goGroupConnector',
      templateUrl: 'groupConnector/goVolunteerGroupConnector.template.html'
    };

    function GoVolunteerGroupConnectorController() {
      var vm = this;
      vm.submit = submit;

      function submit(groupConnector) {
        if (groupConnector) {
          vm.onSubmit({nextState: 'group-find-connector'});
        } else {
          GoVolunteerService.privateGroup = true;
          vm.onSubmit({nextState: 'launch-site'});
        }
      }
    }
  }

})();
