(function() {
  'use strict';

  module.exports = GoVolunteerThankYou;

  GoVolunteerThankYou.$inject = ['$rootScope', 'GoVolunteerService'];

  function GoVolunteerThankYou($rootScope, GoVolunteerService) {
    return {
      restrict: 'E',
      scope: {},
      bindToController: true,
      controller: GoVolunteerThankYouController,
      controllerAs: 'goThankYou',
      templateUrl: 'thankYou/goVolunteerThankYou.template.html'
    };

    function GoVolunteerThankYouController() {
      var vm = this;
      vm.success = null;

      activate();

      function activate() {
        vm.success = (GoVolunteerService.saveSuccessful === true);
      }
    }
  }

})();
