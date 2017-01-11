(function() {
  'use strict';
  module.exports = AdminCheckinDashboardService;

  AdminCheckinDashboardService.$inject = ['$resource'];

  function AdminCheckinDashboardService($resource) {

    return {
      checkinDashboard: $resource(__API_ENDPOINT__ + 'api/eventTool/:eventId/rooms', null, { update: { method:'PUT' } }),
    };

  }

})();

