(function() {

  'use strict()';
  module.exports = function() {

    var REQUIRED_PATTERNS = [
      /^[1-9]\d*$/
    ];

    return {
      restrict: 'A',
      require: 'ngModel',
      scope: {
        maxValue: '@'
      },
      link: function($scope, element, attrs, ngModel) {
        ngModel.$validators.naturalNumber = function(value) {
          var status = true;
          angular.forEach(REQUIRED_PATTERNS, function(pattern) {
            status = status && pattern.test(value);
          });

          // Check input against maxValue if input is a valid number
          if (status && $scope.maxValue > 0) {
            status = value <= $scope.maxValue;
          }

          return status;
        };
      }
    };
  };
})();
