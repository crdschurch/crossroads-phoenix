(function() {
  'use strict';
  module.exports = TripsUrlService;

  TripsUrlService.$inject = ['$location'];

  function TripsUrlService($location) {

    return {
      ShareUrl: function(tripParticipantId) {
        return $location.protocol() + '://' + $location.host() + '/trips/giving/' + tripParticipantId;
      }
    };
  }
})();
