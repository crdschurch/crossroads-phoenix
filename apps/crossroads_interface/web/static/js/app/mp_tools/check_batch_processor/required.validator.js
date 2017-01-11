'use strict()';
(function() {
  angular.module('crossroads.mptools').directive('uiSelectRequired', UiSelectRequired);

  // This Directive validates that an individual item is selected in a ui-select.
  // There is an outstanding bug in ui-select where the standard 'required' directive
  // does not work.  I explicitly did NOT place this in core, as it is specific to
  // this tool (ie, the same directive would not function in other places without an
  // extensive build-out).
  function UiSelectRequired() {
    return {
      require: 'ngModel',
      link: function postLink(scope, element, attrs, ngModel) {
        ngModel.$validators.required = function(value) {
          return value !== undefined && value.id !== undefined;
        }
      }
    };
  }
})();