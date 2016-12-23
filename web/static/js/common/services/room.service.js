(function() {
  'use strict';

  module.exports = Room;

  Room.$inject = ['$resource'];

  function Room($resource) {
    return {
      ByLocation: $resource(__API_ENDPOINT__ + 'api/room/location/:locationId'),
      ByCongregation: $resource(__API_ENDPOINT__ + 'api/congregation/:congregationId/rooms'),
      Layouts: $resource(__API_ENDPOINT__ + 'api/room/layouts'),
      Equipment: $resource(__API_ENDPOINT__ + 'api/congregation/:congregationId/equipment')
    };
  }

})();
