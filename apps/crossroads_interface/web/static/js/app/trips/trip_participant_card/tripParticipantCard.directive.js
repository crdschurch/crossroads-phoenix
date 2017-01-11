(function() {
  'use strict()';

  module.exports = TripParticipantCard;

  TripParticipantCard.$inject = ['$log', 'TripsUrlService', '$state'];

  function TripParticipantCard($log, TripsUrlService, $state) {
    return {
      restrict: 'EA',
      transclude: true,
      templateUrl: 'trip_participant_card/tripParticipantCard.html',
      scope: {
        tripParticipant: '=',
      },
      link: link,
    };

    function link(scope, el, attr) {

      scope.goToGiving = goToGiving;
      scope.shareUrl = shareUrl;

      function goToGiving(tripParticipantId) {
        $state.go('tripgiving.amount', {eventParticipantId: tripParticipantId});
      }

      function shareUrl(tripParticipantId) {
        return TripsUrlService.ShareUrl(tripParticipantId);
      }

    }
  }
})();
