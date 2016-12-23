(function() {
  'use strict';

  module.exports = OneTimeGiving;

  OneTimeGiving.$inject = ['GiveTransferService', 'DonationService', 'GiveFlow', 'Session', '$state'];

  function OneTimeGiving(GiveTransferService, DonationService, GiveFlow, Session, $state) {
    var service = {
      name: 'OneTimeGiving',
      initDefaultState: initDefaultState,
      goToAccount: goToAccount,
      stateName: stateName,
      goToChange: goToChange,
      goToLogin: goToLogin,
      submitBankInfo: submitBankInfo,
      submitChangedBankInfo: submitChangedBankInfo,
      confirmDonation: confirmDonation,
      processChange: processChange,
      getLoggedInUserDonorPaymentInfo: getLoggedInUserDonorPaymentInfo,
      resetGiveFlow: resetGiveFlow,
      resetGiveTransferServiceGiveType: resetGiveTransferServiceGiveType,
      convertToRecurring: convertToRecurring,
    };

    function initDefaultState() {
      GiveTransferService.reset();
      GiveTransferService.processing = false;

      resetGiveFlow();
      GiveTransferService.initialized = true;
      GiveTransferService.givingType = 'one_time';

      Session.removeRedirectRoute();
      $state.go(GiveFlow.amount);
    }

    function resetGiveFlow() {
      GiveFlow.reset({
        amount: 'give.amount',
        account: 'give.one_time_account',
        login: 'give.one_time_login',
        register: 'give.register',
        confirm: 'give.one_time_confirm',
        change: 'give.one_time_change',
        thankYou: 'give.one_time_thank-you'
      });
    }

    function resetGiveTransferServiceGiveType() {
      GiveTransferService.givingType = 'one_time';
    }

    function stateName(state) {
      return GiveFlow[state];
    }

    function goToAccount(giveForm) {
      GiveFlow.goToAccount(giveForm);
    }

    function goToChange() {
      GiveFlow.goToChange();
    }

    function goToLogin() {
      GiveFlow.goToLogin();
    }

    function submitBankInfo(giveForm, programsInput) {
      DonationService.submitBankInfo(giveForm, programsInput);
    }

    function submitChangedBankInfo(giveForm, programsInput) {
      DonationService.submitChangedBankInfo(giveForm, programsInput);
    }

    function confirmDonation(programsInput) {
      DonationService.confirmDonation(programsInput);
    }

    function processChange() {
      DonationService.processChange();
    }

    function getLoggedInUserDonorPaymentInfo(event, toState) {
      DonationService.transitionForLoggedInUserBasedOnExistingDonor(event, toState);
    }

    function convertToRecurring() {
      GiveTransferService.givingType = 'month';
      GiveTransferService.resetForConvert();
      Session.removeRedirectRoute();
      $state.go(GiveFlow.amount);
    }

    return service;
  }

})();
