(function() {
  'use strict';

  var constants = require('crds-constants');

  require('./profileHousehold.template.html');
  angular.module(constants.MODULES.COMMON)
    .directive('profileHousehold', require('./profileHousehold.directive'))
    .controller('ProfileHouseholdController', require('./profileHousehold.controller'))
    ;
})();

