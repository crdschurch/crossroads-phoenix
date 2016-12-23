(function() {
  'use strict';

  module.exports = GoVolunteerProjectPrefThree;

  GoVolunteerProjectPrefThree.$inject = ['GoVolunteerService'];

  function GoVolunteerProjectPrefThree(GoVolunteerService) {
    return {
      restrict: 'E',
      scope: {
        onSubmit: '&'
      },
      bindToController: true,
      controller: GoVolunteerProjectPrefThreeController,
      controllerAs: 'goProjectPrefThree',
      templateUrl: 'projectPrefThree/goVolunteerProjectPrefThree.template.html'
    };

    function GoVolunteerProjectPrefThreeController($sce) {
      var vm = this;

      vm.projectTypes = GoVolunteerService.projectTypes;
      vm.alreadySelected = alreadySelected;
      vm.submit = submit;

      function alreadySelected(projectTypeId) {
        if ((GoVolunteerService.projectPrefOne.projectTypeId === projectTypeId) ||
            (GoVolunteerService.projectPrefTwo.projectTypeId === projectTypeId)) {
          return ['disabled', 'checked'];
        }

        return [];
      }

      function submit(projectType) {
        if ((GoVolunteerService.projectPrefOne === projectType) ||
            (GoVolunteerService.projectPrefTwo === projectType)) {
          return;
        }

        GoVolunteerService.projectPrefThree = projectType;
        vm.onSubmit({nextState: 'unique-skills'});
      }

    }
  }

})();
