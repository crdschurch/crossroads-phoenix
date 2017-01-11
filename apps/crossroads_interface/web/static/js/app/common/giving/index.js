(function() {
  'use strict';

  var constants = require('../../constants');

  angular.module(constants.MODULES.COMMON)
    .directive('currencyMask', require('./currencyMask.directive'))
    .directive('initiativeRequired', require('./initiativeRequired.validation.directive'))
    .directive('invalidAccount', require('./invalidAccount.validation.directive'))
    .directive('invalidRouting', require('./invalidRouting.validation.directive'))
    .directive('naturalNumber', require('./naturalNumber.validation.directive'))
    .run(require('./giving.run'));

  require('./services');
  require('./bankCreditCardDetails');
  require('./donation_details');
  require('./bankInfo');
  require('./creditCardInfo');

})();
