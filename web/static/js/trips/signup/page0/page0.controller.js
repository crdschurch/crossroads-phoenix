(function() {
  'use strict';

  module.exports = Page0Controller;

  Page0Controller.$inject = ['TripsSignupService', 'Campaign', 'Family'];

  function Page0Controller(TripsSignupService, Campaign, Family) {

    var vm = this;
    vm.signupService = TripsSignupService;
    vm.signupService.familyMembers = Family;

    activate();

    ////////////////////////////////
    //// IMPLEMENTATION DETAILS ////
    ////////////////////////////////
    function activate() {
      vm.signupService.reset(Campaign);
      vm.signupService.activate();
    }

  }
})();
