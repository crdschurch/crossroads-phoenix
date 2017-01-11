(function() {
  'use strict';

  module.exports = TripGiving;

  TripGiving.$inject = ['GiveTransferService', 'GiveFlow', 'Session', '$state'];

  function TripGiving(GiveTransferService, GiveFlow, Session, $state) {
    var service = {
      initDefaultState: initDefaultState,
    };

    function initDefaultState(program) {
      GiveTransferService.reset();
      GiveTransferService.program = program;
      GiveTransferService.processing = false;

      // Setup the give flow service
      GiveFlow.reset({
        amount: 'tripgiving.amount',
        account: 'tripgiving.account',
        login: 'tripgiving.login',
        register: 'tripgiving.register',
        confirm: 'tripgiving.confirm',
        change: 'tripgiving.change',
        thankYou: 'tripgiving.thank-you'
      });

      GiveTransferService.initialized = true;

      Session.removeRedirectRoute();
      $state.go(GiveFlow.amount);
    }

    return service;
  }

})();
