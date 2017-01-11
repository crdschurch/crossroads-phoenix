(function() {
  'use strict';

  module.exports = GoVolunteerDataService;
  GoVolunteerDataService.$inject = ['$resource'];
  function GoVolunteerDataService($resource) {
    return {
      Children: $resource(__API_ENDPOINT__ + 'api/goVolunteer/children'),
      ProjectTypes: $resource(__API_ENDPOINT__ + 'api/goVolunteer/projectTypes'),
      PrepWork: $resource(__API_ENDPOINT__ + 'api/govolunteer/prep-times'),
      Equipment: $resource(__API_ENDPOINT__ + 'api/govolunteer/equipment'),
      Create: $resource(__API_ENDPOINT__ + 'api/govolunteer/registration')
    };
  }
})();
