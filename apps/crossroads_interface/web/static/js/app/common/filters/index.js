(function() {
  'use strict';

  var constants = require('crds-constants');

  angular.module(constants.MODULES.COMMON)
    .filter('unique', require('./unique.filter'))

})();
