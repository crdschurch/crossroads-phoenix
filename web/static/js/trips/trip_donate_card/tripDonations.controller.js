(function(){
  'use strict';
  module.exports = TripDonationsController;

  TripDonationsController.$inject = ['$rootScope', 'Trip'];

  /**
   * Takes in as an argument to the directive:
   *    - donation
   *    - tripTitle
   */
  function TripDonationsController($rootScope, Trip) {
    var vm = this;
    vm.getDisplayName = getDisplayName;
    vm.isMessageToggled = false;
    vm.loading = false;
    vm.sendMessage = sendMessage;
    vm.showReplyButton = showReplyButton;
    vm.toggleMessage = toggleMessage;

    activate();

    ////////////////////////////
    // IMPLEMENTATION DETAILS //
    ////////////////////////////

    function activate() {}

    function getDisplayName() {
      if (vm.donation.anonymous) {
        return 'Anonymous';
      }

      if (vm.donation.paymentTypeId === 13) {
        return 'Transfer';
      }

      var lastName = vm.donation.donorLastName === null ? "" : vm.donation.donorLastName;

      return vm.donation.donorNickname + ' ' + lastName;
    }

    function sendMessage(message, onSuccess, onError) {
      console.log(message);
      Trip.Email.save({
        donorId: vm.donation.donorId,
        message: message,
        tripName: vm.tripTitle,
        donationDistributionId: vm.donation.donationDistributionId
      }, function(data) {
        //success!
        vm.loading = false;
        $rootScope.$emit('notify',
            $rootScope.MESSAGES.emailSent);
        vm.donation.messageSent = true;
        onSuccess();
      }, function(data) {
        // error!
        vm.loading = false;
        $rootScope.$emit('notify',
            $rootScope.MESSAGES.emailSendingError);
        onError();
      });
    }

    /**
     * Don't show the reply button when the
     * donor is anonymous or the payment type is
     *    - Scholorship (typeId = 9)
     *    - Transfer (typeID = 13)
     */
    function showReplyButton() {
      if (vm.donation.anonymous ||
          vm.donation.paymentTypeId === 9 ||
          vm.donation.paymentTypeId === 13) {
        return false;
      }


      return true;
    }

    function toggleMessage() {
      vm.isMessageToggled = !vm.isMessageToggled;
    }

  }
})();
