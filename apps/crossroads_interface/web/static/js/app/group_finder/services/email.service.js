(function() {
  'use strict';

  module.exports = function($resource) {
    return {
      GroupMail: $resource(__API_ENDPOINT__ + 'api/sendgroupemail'),
      Mail: $resource(__API_ENDPOINT__ + 'api/sendemail')
    };
  };
})();
