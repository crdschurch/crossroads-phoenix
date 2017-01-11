'use strict';
(function() {
  module.exports = DatepickerValidator;

  DatepickerValidator.$inject = [];

  function convertISODate(dateString) {
    return new Date(dateString.replace(/['"]+/g, ''));
  }

  function DatepickerValidator() {
    return {
      require: 'ngModel',
      link: function(scope, element, attrs, ngModel) {
        ngModel.$validators.minDate = function(value) {
          if (value === undefined || value === null || value === '') {
            return true;
          }

          if (!attrs.minDate) {
            return true;
          }

          var valueDate = crds_utilities.convertStringToDate(value);
          valueDate = new Date(value);
          var minDate = convertISODate(attrs.minDate);
          if (valueDate >= minDate) {
            return true;
          } else {
            return false;
          }
        };

        ngModel.$validators.maxDate = function(value) {
          if (value === undefined || value === null || value === '') {
            return true;
          }

          if (!attrs.maxDate) {
            return true;
          }

          var valueDate = crds_utilities.convertStringToDate(value);
          valueDate = new Date(value);
          var maxDate = convertISODate(attrs.maxDate);
          if (valueDate <= maxDate) {
            return true;
          } else {
            return false;
          }
        };
      }
    };
  }
})();
