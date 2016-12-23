(function() {
  'use strict';
  module.exports = GivingHistoryService;

  GivingHistoryService.$inject = ['$resource'];

  function GivingHistoryService($resource) {

    return {
      // api/donations/?donationYear=YYYY&softCredit=true|false&limit=int
      donations: $resource(__API_ENDPOINT__ + 'api/donations/:donationYear',
        {donationYear: '@donationYear', softCredit: '@includeSoftCredits', limit: '@limit'}),
      donationYears: $resource(__API_ENDPOINT__ + 'api/donations/years'),
      impersonateDonorId: undefined
    };

  }

})();
