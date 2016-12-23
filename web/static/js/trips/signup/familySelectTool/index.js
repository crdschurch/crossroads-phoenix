(function() {
  'use strict';

  var constants = require('crds-constants');

  require('./familySelect.html');
  angular.module(constants.MODULES.TRIPS).directive('familySelect', require('./familySelect.directive'));

})();
