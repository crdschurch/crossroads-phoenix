(function() {
  'use strict';
  module.exports = function() {

    return {
      restrict: 'A',
      require: 'ngModel',
      link: function(scope, element, attrs, ngModel) {
        ngModel.$validators.invalidZip = function(value) {
          if (value === undefined || value === null || value === '') {
            return true;
          }

          var validZip = /^\d{5}(?:[-\s]\d{4})?$/;
          var status = validZip.test(value);
          return status;
        };
      }

    };
  };
})();
