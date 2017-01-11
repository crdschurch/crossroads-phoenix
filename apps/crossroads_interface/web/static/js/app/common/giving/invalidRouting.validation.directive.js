(function() {

  'use strict';
  module.exports = function() {
    return {
      restrict: 'A',
      require: 'ngModel',
      link: function(scope, element, attrs, ngModel) {
        ngModel.$validators.invalidRouting = function(value) {
          var validRtn = /^[0-9]{9}$/;
          var match = validRtn.test(value);
          return match;
        };
      }
    };
  };
})();
