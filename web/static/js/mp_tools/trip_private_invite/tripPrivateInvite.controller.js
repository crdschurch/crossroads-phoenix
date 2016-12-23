(function() {
  'use strict()';

  module.exports = TripPrivateInviteController;

  TripPrivateInviteController.$inject = ['$rootScope', '$scope', '$window', '$log', 'MPTools', 'Trip', 'AuthService', 'CRDS_TOOLS_CONSTANTS'];

  function TripPrivateInviteController($rootScope, $scope, $window, $log, MPTools, Trip, AuthService, CRDS_TOOLS_CONSTANTS) {

    $log.debug('TripPrivateInviteController');
    var vm = this;

    vm.allowAccess = allowAccess;
    vm.cancel = cancel;
    vm.emailPrefix = 'privateInvite';
    vm.fieldError = fieldError;
    vm.formSubmitted = false;
    vm.multipleRecordsSelected = true;
    vm.params = MPTools.getParams();
    vm.processing = false;
    vm.save = save;
    vm.viewReady = false;

    activate();

    //////////////////////

    function activate() {
      vm.pledgeCampaignId = vm.params.recordId;
      vm.multipleRecordsSelected = showError();
      vm.viewReady = true;
    }

    function allowAccess() {
      return (AuthService.isAuthenticated() && AuthService.isAuthorized(CRDS_TOOLS_CONSTANTS.SECURITY_ROLES.TripTools));
    }

    function fieldError(form, field) {
      if (form[field] === undefined) {
        return false;
      }

      if (form.$submitted || form[field].$dirty) {
        return form[field].$invalid;
      }

      return false;
    }

    function cancel() {
      $window.close();
    }

    function save(form) {
      vm.processing = true;

      if (form.privateInviteForm.$invalid) {
        $log.error('please fill out all required fields correctly');
        $rootScope.$emit('notify', $rootScope.MESSAGES.generalError);
        vm.saving = false;
        vm.submitButtonText = 'Submit';
        return false;
      }

      var dto = {};
      dto.pledgeCampaignId = vm.pledgeCampaignId;
      dto.emailAddress = vm.emailAddress;
      dto.recipientName = vm.recipientName;

      Trip.GeneratePrivateInvites.save(dto, function(privateInvite) {
        $window.close();
      },

      function(err) {
        $rootScope.$emit('notify', $rootScope.MESSAGES.generalError);
        vm.processing = false;
      });
    }

    function showError() {
      return vm.params.selectedCount > 1 || vm.params.recordDescription === undefined || vm.params.recordId === '-1';
    }
  }

})();
