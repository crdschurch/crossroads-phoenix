(function() {
  'use strict';

  module.exports = ChildcareService;

  ChildcareService.$inject = ['$resource'];

  function ChildcareService($resource) {
    return {
      ChildcareEvent: $resource(__API_ENDPOINT__ + 'api/childcare/event/:eventId'),
      Children: $resource(__API_ENDPOINT__ + 'api/childcare/eligible-children'),
      Participants: $resource(__API_ENDPOINT__ + 'api/childcare/rsvp')
    };
  }

})();
