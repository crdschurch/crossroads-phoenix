(function() {
  'use strict';

  var constants = require('../../../constants');

  require('./bankCreditCardDetails.html');
  angular.module(constants.MODULES.COMMON)
    .directive('bankCreditCardDetails', require('./bankCreditCardDetails.directive'));

})();
