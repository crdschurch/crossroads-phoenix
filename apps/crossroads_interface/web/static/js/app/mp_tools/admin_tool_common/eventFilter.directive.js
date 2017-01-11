(function() {
  'use strict';

  module.exports = EventFilter;

  EventFilter.$inject = ['$log'];

  function EventFilter($log) {
    return {
      restrict: 'EA',
      replace: true,
      scope: {
        label: '@',
        event: '=',
        events: '=',
        onChange: '&?'
      },
      templateUrl: 'templates/eventFilter.html',
      link: link
    };

    function link(scope, element, attrs) {
      scope.change = change;

      function change() {
        if (scope.onChange != undefined) {
          scope.onChange();
        }
      }
    }
  }
})();
