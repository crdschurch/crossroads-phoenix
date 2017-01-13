(function() {
  'use strict';

  var constants = require('constants');

  angular.module(constants.MODULES.COMMON)
    .filter('unique', require('./unique.filter'))

})();
