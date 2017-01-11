(function() {
  'use strict';

  module.exports = ProfileCommunicationsController;

  ProfileCommunicationsController.$inject = [
    '$rootScope',
    'Profile',
    'Person',
    'Subscriptions',
    'Statement'];

  function ProfileCommunicationsController($rootScope,
                                           Profile,
                                           Person,
                                           Subscriptions,
                                           Statement) {
    var vm = this;

    vm.enableStatement = enableStatement;
    vm.hasDonor = hasDonor;
    vm.hasAddress = hasAddress;
    vm.person = Person;
    vm.savePaperless = savePaperless;
    vm.saveSubscription = saveSubscription;
    vm.statement = Statement;
    vm.subscriptions = Subscriptions;

    function savePaperless() {
      if (!enableStatement()) {
        return;
      }

      Profile.Statement.save(vm.statement,
        function(data) {
          $rootScope.$emit('notify', $rootScope.MESSAGES.profileUpdated);
        },

        function(error) {
          $rootScope.$emit('notify', $rootScope.MESSAGES.generalError);
        });
    }

    function saveSubscription(subscription) {
      if (subscription.Subscription) {
        subscription.Subscription.Unsubscribed = !subscription.Subscribed;
      } else {
        subscription.Subscription = {
          Publication_ID: subscription.ID,
          Publication_Title: subscription.Title,
          Unsubscribed: !subscription.Subscribed
        };
      }

      Profile.Subscriptions.save(subscription.Subscription).$promise
        .then(function(data) {
          subscription.Subscription.dp_RecordID = data.dp_RecordID;
          $rootScope.$emit('notify', $rootScope.MESSAGES.profileUpdated);
        },

        function(error) {
          $rootScope.$emit('notify', $rootScope.MESSAGES.generalError);
        });
    }

    function enableStatement() {
      if (!hasDonor()) {
        return false;
      }

      if (!hasAddress()) {
        return false;
      }

      return true;
    }

    function hasDonor() {
      return vm.statement.donorId ? true : false;
    }

    function hasAddress() {
      return vm.person.addressLine1 ? true : false;
    }
  }
})();
