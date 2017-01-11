(function() {
  'use strict';

  module.exports = AddressService;

  AddressService.$inject = [];

  function AddressService() {
    var address = {};

    address.mapLink = mapLink;

    function mapLink(address) {
      var link = '';
      if (address.addressLine1 && address.city && address.state && address.zip) {
        var searchAddress = address.addressLine1 + ', ' + address.city + ', ' + address.state + ', ' + address.zip;
        link = 'https://maps.google.com/?q=' + searchAddress.replace(/\s/g, '+');
      }

      return link;
    }

    return address;
  }
})();