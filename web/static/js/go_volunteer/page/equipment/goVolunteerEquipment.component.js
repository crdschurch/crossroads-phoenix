(function() {
  'use strict';

  module.exports = GoVolunteerEquipment;

  GoVolunteerEquipment.$inject = ['GoVolunteerService'];

  function GoVolunteerEquipment(GoVolunteerService) {
    return {
      restrict: 'E',
      scope: {
        onSubmit: '&'
      },
      bindToController: true,
      controller: GoVolunteerEquipmentController,
      controllerAs: 'goEquipment',
      templateUrl: 'equipment/goVolunteerEquipment.template.html'
    };

    function GoVolunteerEquipmentController() {
      var vm = this;

      vm.service = GoVolunteerService;

      vm.addEquipment = addEquipment;
      vm.equipment = GoVolunteerService.availableEquipment;
      vm.otherField = false;
      vm.otherEquipment = GoVolunteerService.otherEquipment;
      vm.showOtherEquipment = showOtherEquipment;
      vm.submit = submit;

      activate();

      function activate() {
        if (vm.otherEquipment.length > 0) {
          vm.otherField = true;
        }
      }

      function addEquipment() {
        vm.otherEquipment.push({equipment: {name: null}});
      }

      function showOtherEquipment() {
        vm.otherField = !vm.otherField;
        if (vm.otherField && vm.otherEquipment.length === 0) {
          vm.addEquipment();
        } else if (!vm.otherField) {
          GoVolunteerService.otherEquipment = [];
          vm.otherEquipment = GoVolunteerService.otherEquipment;
        }
      }

      function submit() {
        GoVolunteerService.equipment = _.where(vm.equipment, {checked: true});
        vm.onSubmit({nextState: 'additional-info'});
      }
    }
  }

})();
