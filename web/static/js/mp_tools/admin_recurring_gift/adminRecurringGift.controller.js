(function() {
  'use strict';

  module.exports = AdminRecurringGiftController;

  AdminRecurringGiftController.$inject = ['$log', '$filter', '$modal', '$rootScope', 'DonationService', 'GiveTransferService', 'AuthService', 'CRDS_TOOLS_CONSTANTS'];

  function AdminRecurringGiftController($log, $filter, $modal, $rootScope, DonationService, GiveTransferService, AuthService, CRDS_TOOLS_CONSTANTS) {
    var vm = this;
    vm.recurring_gifts = [];
    vm.recurring_giving = false;
    vm.recurring_giving_view_ready = false;
    vm.openCreateGiftModal = openCreateGiftModal;
    vm.modalInstance = undefined;
    vm.impersonateDonorId = undefined;
    vm.impersonationError = false;
    vm.impersonationErrorMessage = undefined;

    activate();

    function activate() {
      vm.impersonateDonorId = GiveTransferService.impersonateDonorId;

      DonationService.queryRecurringGifts(vm.impersonateDonorId).then(function(data) {
        vm.recurring_gifts = data;
        vm.recurring_giving_view_ready = true;
        vm.recurring_giving = true;
      }, function(error) {

        vm.recurring_giving = false;
        vm.recurring_giving_view_ready = true;
        setErrorState(error);
      });
    }

    vm.allowAdminAccess = function() {
      return (AuthService.isAuthenticated() && AuthService.isAuthorized(CRDS_TOOLS_CONSTANTS.SECURITY_ROLES.FinanceTools));
    };

    function setErrorState(error) {
      if (vm.impersonateDonorId === undefined || error === undefined || error.httpStatusCode === undefined) {
        return;
      }

      switch (error.httpStatusCode) {
        case 403: // Forbidden - not allowed to impersonate
          vm.impersonationError = true;
          vm.impersonationErrorMessage = error.data === undefined || error.data.message === undefined ?
              'User is not allowed to impersonate' : error.data.message;
          break;
        case 409: // Conflict - tried to impersonate, but user could not be found
          vm.impersonationError = true;
          vm.impersonationErrorMessage = error.data === undefined || error.data.message === undefined ?
              'Could not find user to impersonate' : error.data.message;
          break;
        default:
          break;
      }
    }

    function openCreateGiftModal() {
      vm.modalInstance = $modal.open({
        parent: 'noSideBar',
        templateUrl: 'recurring_giving_create_modal',
        controller: 'RecurringGivingModals as recurringGift',
        resolve: {
          donation: function() {
            return null;
          },

          Programs: 'Programs',
          programList: function(Programs) {
            // TODO The number one relates to the programType in MP. At some point we should fetch
            // that number from MP based in human readable input here.
            return Programs.Programs.query({
              programType: 1
            }).$promise;
          },
        }
      });

      vm.modalInstance.result.then(function(success) {
        if (success) {
          DonationService.queryRecurringGifts(vm.impersonateDonorId).then(function(data) {
            vm.recurring_gifts = data;
          }, function(/*error*/) {

            $rootScope.$emit('notify', $rootScope.MESSAGES.failedResponse);
          });

          $rootScope.$emit('notify', $rootScope.MESSAGES.giveRecurringSetupSuccess);
        } else {
          $rootScope.$emit('notify', $rootScope.MESSAGES.giveRecurringSetupWarning);
        }
      }, function() {

        $log.info('Modal dismissed at: ' + new Date());
      });
    }
  }
})();
