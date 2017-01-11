(function() {
  'use strict';

  module.exports = StaffContact;

  StaffContact.$inject = ['$resource'];

  function StaffContact($resource) {
    return $resource(__API_ENDPOINT__ + 'api/staffcontacts');
  }
})();
