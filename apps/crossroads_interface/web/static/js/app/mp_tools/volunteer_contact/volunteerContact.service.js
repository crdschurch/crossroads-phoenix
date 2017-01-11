(function() {
  'use strict';

  module.exports = VolunteerContact;

  VolunteerContact.$inject = ['$resource'];

  function VolunteerContact($resource) {
    return {
      GroupMail: $resource(__API_ENDPOINT__ + 'api/sendgroupemail')
    };
  }
})();
