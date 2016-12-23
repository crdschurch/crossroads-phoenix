'use strict';
(function() {
  module.exports = ProfileHouseholdController;

  ProfileHouseholdController.$inject = [
    '$rootScope',
    '$location',
    '$anchorScroll',
    '$timeout',
    '$log',
    'Profile',
    'Lookup',
    'Validation'];

  /**
   * The controller for the household form directive
   * Variables passed in include:
   *  - householdInfo -- this is what the form fields are bound too
   */
  function ProfileHouseholdController(
          $rootScope,
          $location,
          $anchorScroll,
          $timeout,
          $log,
          Profile,
          Lookup,
          Validation) {

    var vm = this;

    vm.countries = getCountries();
    vm.displayName = displayName;
    vm.displayLocation = displayLocation;
    vm.states = getStates();
    vm.validation = Validation;
    vm.phoneFormat = vm.validation.phoneFormat();
    vm.validLocations = validLocations(vm.locations);
    if (typeof vm.isCollapsed === 'undefined') {
      vm.isCollapsed = true;
    }

    $rootScope.$on('locationFocus', function(event, data) {
      vm.isCollapsed = false;
      $location.hash('Site');
      $timeout(function() {
        $anchorScroll();
      }, 500);
    });

    activate();

    ////////////////////////////////
    //// Implementation Details ////
    ////////////////////////////////
    function activate() {
      if (vm.householdInfo !== undefined && vm.householdId) {
        Profile.Household.get({ householdId: vm.householdId}, function(data) {
          vm.info = data;
        });
      }
    }

    function displayName(member) {
      return member.Nickname + ' ' + member.LastName;
    }

    function displayLocation(locationId) {
      return _.result(_.find(vm.locations, {'dp_RecordID':locationId}), 'dp_RecordName');
    }

    function getCountries() {
      return Lookup.query({
        table: 'countries'
      }, function(data) {
        return data;
      });
    }

    function getStates() {
      return Lookup.query({
        table: 'states'
      }, function(data) {
        return data;
      });
    }

    function validLocations(locations) {
      return _.map(locations, function(location) {
        return location.dp_RecordID;
      });
    }
  }
})();
