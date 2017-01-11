(function() {
  'use strict';

  module.exports = EmailBoxController;

  EmailBoxController.$inject = ['$rootScope'];

  /**
   * Variables available on scope because they
   * have been passed into the directive:
   *   - isMessageToggled = boolean
   *   - sendMessageCallback = function to handle sending the message
   *   - loading = boolean to determine if the send button should show
   *               the loading state
   */
  function EmailBoxController($rootScope) {
    var vm = this;
    vm.cancel = cancel;
    vm.formError = false;
    vm.hasError = hasError;
    vm.messageText = '';
    vm.sendMessage = sendMessage;

    activate();

    ////////////////////////////
    // IMPLEMENTATION DETAILS //
    ////////////////////////////

    function activate() {
      if (vm.isMessageToggled === undefined) {
        vm.isMessageToggled = false;
      }
    }

    function cancel() {
      vm.isMessageToggled = false;
      vm.messageText = null;
      vm.messageForm.$setPristine();
      vm.formError = false;
    }

    function hasError() {
      return vm.messageForm.messageText.$error &&
        vm.messageForm.messageText.$invalid &&
        vm.formError;
    }

    function sendMessage() {
      if (!vm.messageForm.$valid) {
        vm.formError = true;
        $rootScope.$emit('notify', $rootScope.MESSAGES.generalError);
        return;
      }

      vm.loading = true;
      vm.sendMessageCallback({
        message: vm.messageText,
        onSuccess: function() {
          vm.messageText = null;
          vm.isMessageToggled = false;
        },

        onError: function() {

        }
      });
    }
  }

})();
