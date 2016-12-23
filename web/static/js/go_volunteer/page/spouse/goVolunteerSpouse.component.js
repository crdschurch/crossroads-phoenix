(function() {
  'use strict';

  module.exports = GoVolunteerSpouse;

  GoVolunteerSpouse.$inject = ['GoVolunteerService'];

  function GoVolunteerSpouse(GoVolunteerService) {
    return {
      restrict: 'E',
      scope: {
        onSubmit: '&'
      },
      bindToController: true,
      controller: GoVolunteerSpouseController,
      controllerAs: 'goSpouse',
      templateUrl: 'spouse/goVolunteerSpouse.template.html'
    };

    function GoVolunteerSpouseController() {
      var vm = this;
      vm.spouseKnown = true;
      vm.spouse = GoVolunteerService.spouse;
      vm.spouseName = spouseName;
      vm.submit = submit;

      function spouseName() {
        if (vm.spouse.fromDb) {
          return vm.spouse.preferredName + ' ' + vm.spouse.lastName;
        } else {
          vm.spouseKnown = false;
          return 'your spouse';
        }
      }

      function submit(spouseServing) {
        GoVolunteerService.spouseAttending = spouseServing;
        if (spouseServing) {
          if (vm.spouseKnown) {
            vm.onSubmit({nextState: 'children'});
          } else {
            vm.onSubmit({nextState: 'spouse-name'});
          }
        } else {
          vm.onSubmit({nextState: 'children'});
        }
      }
    }
  }

})();
