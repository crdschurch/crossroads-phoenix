(function() {
    'use strict';

    module.exports = TheDailyController;

    TheDailyController.$inject = [
        '$rootScope',
        '$log',
        '$state',
        'EmailSubscriptionService',
        'Validation'
    ];

    function TheDailyController(
        $rootScope,
        $log,
        $state,
        EmailSubscriptionService,
        Validation
    ) {

        $log.debug('Inside The Daily Controller');

        var vm = this;
        vm.email = '';
        vm.listName = 'The Daily'; // eventually move to key, not list name
        vm.saving = false;
        vm.showSignup = true;
        vm.validation = Validation;
        vm.submitSignup = submitSignup;

        function submitSignup() {

            vm.saving = true;
            if (vm.MailchimpSubscriptionForm.$valid) {
                EmailSubscriptionService.SubscriptionSignup.save({ emailAddress: vm.email, listName: vm.listName }, function(response) {

                    if (response.ErrorInSignupProcess === true) {
                        $rootScope.$emit('notify', $rootScope.MESSAGES.generalError);
                    } else if (response.UserAlreadySubscribed === true) {
                        vm.showSignup = false;
                        $rootScope.$emit('notify', $rootScope.MESSAGES.dailyAlreadySignedUp
                        );
                    } else if (response.UserAlreadySubscribed === false) {
                        vm.showSignup = false;
                        $rootScope.$emit('notify', $rootScope.MESSAGES.mailchimpSuccess);
                    }

                    vm.saving = false;

                }, function(error) {
                    $rootScope.$emit('notify', $rootScope.MESSAGES.generalError);
                    vm.saving = false;
                });
            } else {
                vm.saving = false;
            }
        }
    }
})();
