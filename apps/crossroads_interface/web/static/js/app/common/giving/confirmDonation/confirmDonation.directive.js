(function() {
  'use strict';

  module.exports = ConfirmDonation;

  ConfirmDonation.$inject = ['$rootScope', 'Session', '$state', 'GiveFlow', 'GiveTransferService', 'DonationService'];

  function ConfirmDonation($rootScope, Session, $state, GiveFlow, GiveTransferService, DonationService) {
    return {
      restrict: 'EA',
      replace: true,
      scope: {
        programsInput: '=',
        processing: '='
      },
      templateUrl: 'confirmDonation/confirmDonation.html',
      link: link
    };

    function link(scope, el, attr) {
      scope.confirmDonation = confirmDonation;
      scope.dto = GiveTransferService;

      function confirmDonation() {
        if (!Session.isActive()) {
          GiveFlow.goToLogin();
        }

        try {
          var pgram = _.find(scope.programsInput, { ProgramId: scope.dto.program.ProgramId });
          scope.processing = true;
          DonationService.donate(pgram, function(confirmation) {

          }, function(error) {

            if (scope.dto.declinedPayment) {
              GiveFlow.goToChange();
            }

          });
        } catch (DonationException) {
          $rootScope.$emit('notify', $rootScope.MESSAGES.failedResponse);
        }
      }
    }
  }

})();
