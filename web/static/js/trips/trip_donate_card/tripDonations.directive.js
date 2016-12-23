(function() {
  'use strict()';

  module.exports = TripDonations;

  TripDonations.$inject = ['$log', 'Session'];

  function TripDonations($log, Session) {
    return {
      restrict: 'EA',
      transclude: true,
      templateUrl: 'trip_donate_card/tripDonations.html',
      scope: {
        donation: '=',
        tripTitle: '='
      },
      controller: 'TripDonationsController as tripDonations',
      bindToController: true
    };
  }
})();
