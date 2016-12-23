(function() {
  'use strict';

  module.exports = GoVolunteerAvailablePrep;

  GoVolunteerAvailablePrep.$inject = ['GoVolunteerService'];

  function GoVolunteerAvailablePrep(GoVolunteerService) {
    return {
      restrict: 'E',
      scope: {
        onSubmit: '&',
        forSpouse: '=forSpouse'
      },
      bindToController: true,
      controller: GoVolunteerAvailablePrepController,
      controllerAs: 'goAvailablePrep',
      templateUrl: 'availablePrep/goVolunteerAvailablePrep.template.html'
    };

    function GoVolunteerAvailablePrepController() {
      var vm = this;
      vm.chooseTime = chooseTime;
      vm.forSpouse = vm.forSpouse || false;
      vm.prepWork = GoVolunteerService.prepWork;

      activate();

      /////////////////////////

      function activate() {
        if (vm.prepWork === undefined || _.isEmpty(vm.prepWork)) {
          // set the availability to no?

          vm.onSubmit({nextState: 'waiver'});
        }
      }

      function chooseTime(prepTime) {
        if (vm.forSpouse) {
          GoVolunteerService.spousePrepTime = prepTime;
          vm.onSubmit({nextState: 'waiver'});
        } else {
          GoVolunteerService.myPrepTime = prepTime;
          vm.onSubmit({nextState: 'available-prep-spouse'});
        }
      }
    }
  }

})();
