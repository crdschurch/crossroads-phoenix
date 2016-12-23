(function() {
  'use strict';
  module.exports = MyTripsController;
  MyTripsController.$inject = ['$log', 'MyTrips', 'TripsUrlService'];

  function MyTripsController($log, MyTrips, TripsUrlService) {
    var vm = this;

    activate();

    /////////////////////////
    //// Implementations ////
    /////////////////////////
    function activate() {
      vm.myTrips = MyTrips.myTrips;
      _.each(vm.myTrips, function(trip) {
        trip.shareUrl = TripsUrlService.ShareUrl(trip.eventParticipantId);
      });
    }
  }
})();
