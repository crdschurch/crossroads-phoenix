
(function() {
  'use strict';

  module.exports = AddressValidation;

  AddressValidation.$inject = ['$resource'];

  function AddressValidation($resource) {
    return {
      validateAddressString: function(address) {
        let promised = $resource(`${__API_ENDPOINT__}api/address/validate`).
                          get({ address: address}).$promise;
        return promised.then((data) => {
          return data;
        }, (err) => {
          throw err;
        });
      },
      validateAddressObject: function(address) {
        let promised = $resource(`${__API_ENDPOINT__}api/address/validate`).
                          post({ address: address}).$promise;
        return promised.then((data) => {
          return data;
        }, (err) => {
          throw err;
        });
      }
    };
  }
})();
