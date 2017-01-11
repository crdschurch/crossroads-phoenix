(function() {

  module.exports = GroupService;

  GroupService.$inject = ['$resource', '$log'];

  function GroupService($resource, $log) {
    return {
      Participant: $resource(__API_ENDPOINT__ +  'api/group/:groupId/participants', {groupId: '@groupId'},
        {save: {method:'POST', isArray:true}}),
      Type: $resource(__API_ENDPOINT__ +  'api/group/groupType/:groupTypeId', {groupTypeId: '@groupTypeId'}),
      Search: $resource(__API_ENDPOINT__ + 'api/group/groupType/:groupTypeId/search', {groupTypeId: '@groupTypeId'},
        {save: {method:'POST', isArray:true}}),
      Detail: $resource(__API_ENDPOINT__ +  'api/group/:groupId', {groupId: '@groupId'}),
      Events: $resource(__API_ENDPOINT__ + 'api/group/:groupId/events'),
      Participants: $resource(__API_ENDPOINT__ + 'api/group/:groupId/event/:eventId'),
      EmailInvite: $resource(__API_ENDPOINT__ + '/api/journey/emailinvite')
    };
  }

})();
