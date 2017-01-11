(function() {
  'use strict';

  module.exports = ConfirmPasswordController;

  ConfirmPasswordController.$inject = [
      '$rootScope',
      '$modalInstance',
      'modalTypeItem',
      'email',
      'PasswordService'
  ];

  function ConfirmPasswordController(
      $rootScope,
      $modalInstance,
      modalTypeItem,
      email,
      PasswordService) {

    var vm = this;
    vm.ok = ok;
    vm.cancel = cancel;
    vm.passwd = '';
    vm.modalTypeItem = modalTypeItem;
    vm.email = email;
    vm.saving = false;

    function ok() {

      vm.saving = true;
      var credentials = { username: vm.email, password: vm.passwd };

      PasswordService.VerifyCredentials.save(credentials).$promise.then(function(response) {
        vm.passwd = '';
        $modalInstance.close(credentials.password);
      }, function(error) {

        $rootScope.$emit('notify', $rootScope.MESSAGES.passwordNotVerified);
        vm.saving = false;
      });
    }

    function cancel() {
      vm.passwd = '';
      $modalInstance.close();
    }

  }
})();
