(function() {
  'use strict';

  module.exports = GoVolunteerAdditionalInfo;

  GoVolunteerAdditionalInfo.$inject = ['GoVolunteerService'];

  function GoVolunteerAdditionalInfo(GoVolunteerService) {
    return {
      restrict: 'E',
      scope: {
        onSubmit: '&'
      },
      bindToController: true,
      controller: GoVolunteerAdditionalInfoController,
      controllerAs: 'goAdditionalInfo',
      templateUrl: 'additionalInfo/goVolunteerAdditionalInfo.template.html'
    };

    function GoVolunteerAdditionalInfoController() {
      var vm = this;
      vm.submit = submit;

      activate();

      function activate() {
        if (GoVolunteerService.additionalInformation) {
          vm.additionalInfo = angular.copy(GoVolunteerService.additionalInformation);
        }
      }

      function submit() {
        GoVolunteerService.additionalInformation = angular.copy(vm.additionalInfo);
        vm.onSubmit({nextState: 'available-prep'});
      }
    }
  }

})();
