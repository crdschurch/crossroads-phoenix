(function() {
  'use strict';

  module.exports = GoVolunteerOrgName;

  GoVolunteerOrgName.$inject = ['GoVolunteerService', 'Organizations'];

  function GoVolunteerOrgName(GoVolunteerService, Organizations) {
    return {
      restrict: 'E',
      scope: {
        onSubmit: '&'
      },
      bindToController: true,
      controller: GoVolunteerOrgNameController,
      controllerAs: 'goOrgName',
      templateUrl: 'orgName/goVolunteerOrgName.template.html'
    };

    function GoVolunteerOrgNameController() {
      var vm = this;
      vm.activate = activate;
      vm.availableOptions = [];
      vm.otherOrgName = GoVolunteerService.otherOrgName;
      vm.submit = submit;

      vm.activate();

      /////////////////////////

      function activate() {
        Organizations.Others.query(function(data) {
          vm.availableOptions = data;
        },

        function(err) {
          //console.log(err);
        });
      }

      function submit() {
        if (vm.otherOrgName) {
          GoVolunteerService.otherOrgName = vm.otherOrgName;
        }

        vm.onSubmit({nextState: 'profile'});
      }
    }
  }
})();
