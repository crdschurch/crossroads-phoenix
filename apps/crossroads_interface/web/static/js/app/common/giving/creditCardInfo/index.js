(function() {
  'use strict';

  var constants = require('../../../constants');

  require('./creditCardInfo.html');

  angular.module(constants.MODULES.COMMON)
    .directive('creditCardInfo', require('./creditCardInfo.directive'));

})();
