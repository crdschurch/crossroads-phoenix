(function() {
  'use strict';
  module.exports = factory;
  factory.$inject = ['Lookup', 'Profile', '$resolve'];

  // Return a non-singleton object factory for getting the map of data needed
  // by the profile pages.  Controllers should use getInstance() to get a
  // a promise, which will be resolved by the Angular UI Router resolver ($resolve).
  // This is similar to the behavior implemented by the resolve property on a
  // UI Router state.
  function factory(Lookup, Profile, $resolve) {
    var data = {
      genders: function() {
        return Lookup.query({
          table: 'genders'
        }).$promise;
      },

      maritalStatuses: function() {
        return Lookup.query({
          table: 'maritalstatus'
        }).$promise;
      },

      serviceProviders: function() {
        return Lookup.query({
          table: 'serviceproviders'
        }).$promise;
      },
    };

    return {
      getInstance: function() {
        return $resolve.resolve(data);
      }
    };
  }
})();
