(function () {
  angular.module("crossroads.core").directive("invalidatePastDate", function () {
    return {
      require: 'ngModel',
      link: function (scope, element, attrs, ngModel) {
        ngModel.$validators.pastDate = function (value) {
          var currentDate = new Date(Date.now());
          currentDate.setHours(0, 0, 0, 0);

          if (!value) {
            return true;
          }

          if (value >= currentDate) {
            return true;
          } else {
            return false;
          }
        }
      }
    }
  })
})()
