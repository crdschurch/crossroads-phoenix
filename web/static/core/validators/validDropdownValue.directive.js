(function() {
  'use strict';

  module.exports = ValidDropdownValue;

  ValidDropdownValue.$inject = [];

  function ValidDropdownValue() {
    return {
      restrict: 'A',
      require: 'ngModel',
      scope: {
        validDropdownValue: '='
      },
      link: link
    };

    function link(scope, ele, attr, ctrl) {
      if (ctrl) {
        ctrl.$validators.required = function(val) {
          if (!val) {
            return false;
          }

          // Sometimes the validDropdownValue list comes in empty
          // in these cases, we just need to validate that the value
          // is not undefined, null or 0.
          if (scope.validDropdownValue.length < 1) {
            return val !== undefined && val !== null && val !== 0;
          }
          return _.includes(scope.validDropdownValue, val);
        };
      }
    }
  }

})();
