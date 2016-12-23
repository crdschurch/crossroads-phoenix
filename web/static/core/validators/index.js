(function() {
  'use strict';

  angular.module('crossroads.core')
    .factory('Validation', require('./validation.service'))
    .directive('invalidZip', require('./invalidZip.validation.directive'))
    .directive('validDropdownValue', require('./validDropdownValue.directive'));

})();
