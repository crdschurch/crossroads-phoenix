(function () {
  'use strict';

  module.exports = RssFeed;

  RssFeed.$inject = ['$window', '$timeout'];

  function RssFeed($window, $timeout) {
    return {
      restrict: 'E',
      templateUrl: function (elem, attr) {
        return 'templates/rssFeed.html';
      },
      scope: {
        link: '@'
      },
      link: function (scope, element, attrs) {
        element.on('click', function ($event) {
          $event.stopPropagation();
        });

        scope.showCopyLink = true;

        var input = angular.element(element[0].querySelector('input'))[0];

        scope.textboxBlur = function() {
          scope.showCopyLink = true;
        };

        scope.copyClicked = function() {
          scope.showCopyLink = false;

          $timeout(function() {
            selectText(input);
          });
        };
      }
    };

    function selectText(input) {
      input.focus();
      if (!$window.getSelection().toString()) {
        // Required for mobile Safari
        input.setSelectionRange(0, input.value.length);
      }
    }
  }
})();
