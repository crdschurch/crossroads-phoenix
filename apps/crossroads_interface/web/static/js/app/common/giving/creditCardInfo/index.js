(function() {
  'use strict';

  var constants = require('crds-constants');

  require('./creditCardInfo.html');

  angular.module(constants.MODULES.COMMON)
    .directive('creditCardInfo', require('./creditCardInfo.directive'));

})();
