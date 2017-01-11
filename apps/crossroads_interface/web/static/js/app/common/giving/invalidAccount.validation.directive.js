(function() {
  'use strict';
  module.exports = function() {
    return {
      restrict: 'A',
      require: 'ngModel',
      link: function(scope, element, attrs, ngModel) {
        ngModel.$validators.invalidAccount = function(value) {
          var validAccount = /^[0-9]{1,30}$/;
          var match = validAccount.test(value);
          return match;
        };
      }
    };
  };
})();
