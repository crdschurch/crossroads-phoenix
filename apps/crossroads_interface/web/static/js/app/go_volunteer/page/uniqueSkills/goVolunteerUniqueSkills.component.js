(function() {
  'use strict';

  module.exports = GoVolunteerUniqueSkills;

  GoVolunteerUniqueSkills.$inject = ['GoVolunteerService'];

  function GoVolunteerUniqueSkills(GoVolunteerService) {
    return {
      restrict: 'E',
      scope: {
        onSubmit: '&' 
      },
      bindToController: true,
      controller: GoVolunteerUniqueSkillsController,
      controllerAs: 'goUniqueSkills',
      templateUrl: 'uniqueSkills/goVolunteerUniqueSkills.template.html'
    };

    function GoVolunteerUniqueSkillsController() {
      var vm = this; 
      vm.skills = GoVolunteerService.skills; 
      vm.submit = submit; 

      function submit() {
        vm.onSubmit({nextState:'equipment'});
      }
    }
  }

})();
