(function() {
  'use strict';

  module.exports = Organizations;

  Organizations.$inject = ['$stateParams', 'GoVolunteerService'];

  function Organizations($stateParams, GoVolunteerService) {
    return {
      restrict: 'E',
      scope: {},
      bindToController: true,
      controller: OrganizationsController,
      controllerAs: 'organizations',
      templateUrl: 'organizations/organizations.template.html'
    };

    function OrganizationsController() {
      var vm = this;

      vm.cmsInfo = GoVolunteerService.cmsInfo.pages[0];
      vm.content = vm.cmsInfo.content;
    }
  }

})();
