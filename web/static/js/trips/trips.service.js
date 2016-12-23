(function() {
  module.exports = Trip;

  Trip.$inject = ['$resource'];

  function Trip($resource) {
    return {
      Search: $resource(__API_ENDPOINT__ + 'api/trip/search'),
      MyTrips: $resource(__API_ENDPOINT__ + 'api/trip/mytrips'),
      Email: $resource(__API_ENDPOINT__ + 'api/donation/message'),
      TripFormResponses: $resource(__API_ENDPOINT__ + 'api/trip/form-responses/:selectionId/:selectionCount/:recordId'),
      SaveParticipants: $resource(__API_ENDPOINT__ + 'api/trip/participants'),
      TripParticipant: $resource(__API_ENDPOINT__ + 'api/trip/participant/:tripParticipantId'),
      Campaign: $resource(__API_ENDPOINT__ + 'api/trip/campaign/:campaignId'),
      WorkTeams: $resource(__API_ENDPOINT__ + 'api/lookup?table=workteams'),
      GeneratePrivateInvites: $resource(__API_ENDPOINT__ + 'api/trip/generate-private-invite'),
      ValidatePrivateInvite: $resource(__API_ENDPOINT__ + 'api/trip/validate-private-invite/:pledgeCampaignId/:guid'),
      Family: $resource(__API_ENDPOINT__ + 'api/trip/:pledgeCampaignId/family-members'),
      TripScholarship: $resource(__API_ENDPOINT__ + 'api/trip/scholarship/:campaignId/:contactId')
    };
  }
})();
