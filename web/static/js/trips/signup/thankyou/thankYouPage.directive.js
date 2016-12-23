(function() {
  'use strict';

  module.exports = ThankYouPageDirective;

  ThankYouPageDirective.$inject = ['$stateParams', 'Trip', 'TripsSignupService'];

  function ThankYouPageDirective($stateParams, Trip, TripsSignupService) {
    return {
      restrict: 'E',
      replace: true,
      scope: {
        currentPage: '=',
        pageTitle: '=',
        numberOfPages: '=',
      },
      templateUrl: 'thankyou/thankYou.html',
      controller: 'PagesController as pages',
      bindToController: true,
      link: link,
    };

    function link(scope, el, attr, vm) {
      vm.loading = true;
      activate();

      function activate() {
        Trip.Family.query({pledgeCampaignId: $stateParams.campaignId}, function(data) {
          vm.thankYouFamilyMembers = data;
          _.each(vm.thankYouFamilyMembers, function(f) {
            if (f.contactId === TripsSignupService.contactId) {
              f.signedUp = true;
              f.signedUpDate = new Date();
            }
          });

          vm.loading = false;
        });
      }

    }
  }
})();
