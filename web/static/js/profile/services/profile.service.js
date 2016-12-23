(function() {
  'use strict()';
  
  module.exports = function($resource) {
    return {
      Personal: $resource(__API_ENDPOINT__ + 'api/profile'),
      Person: $resource(__API_ENDPOINT__ +  'api/profile/:contactId'),
      AdminPerson: $resource(__API_ENDPOINT__ +  'api/profile/:contactId/admin'),
      Account: $resource(__API_ENDPOINT__ + 'api/account'),
      Password: $resource(__API_ENDPOINT__ + 'api/account/password'),
      Subscriptions: $resource(__API_ENDPOINT__ + 'api/subscriptions'),
      Household: $resource(__API_ENDPOINT__ + 'api/profile/household/:householdId'),
      Statement: $resource(__API_ENDPOINT__ + 'api/donor-statement'),
      Spouse: $resource(__API_ENDPOINT__ + 'api/profile/:contactId/spouse')
    };
  };
})();
