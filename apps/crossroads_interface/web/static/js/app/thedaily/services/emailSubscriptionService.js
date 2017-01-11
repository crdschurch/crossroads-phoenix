(function() {
    'use strict';

    module.exports = EmailSubscriptionService;

    EmailSubscriptionService.$inject = ['$resource'];

    function EmailSubscriptionService($resource) {
        return {
            SubscriptionSignup: $resource(__API_ENDPOINT__ + 'api/subscriptions/optin')
        };
    }

})();
