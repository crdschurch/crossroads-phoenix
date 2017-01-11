(function() {
  'use strict';
  angular.module('crossroads.core').directive('btnLoading', btnLoading);

  btnLoading.$inject = [];

  function btnLoading() {
    return {
      link: function(scope, element, attrs) {
        scope.$watch(
          function() {
            return scope.$eval(attrs.btnLoading);
          },

          function(value) {
            if (value) {
              if (!attrs.hasOwnProperty('ngDisabled')) {
                element.addClass('disabled').attr('disabled', 'disabled');
              }

              element.data('resetText', element.html());
              element.html(element.attr('data-loading-text'));
            } else {
              if (!attrs.hasOwnProperty('ngDisabled')) {
                element.removeClass('disabled').removeAttr('disabled');
              }

              element.html(element.data('resetText'));
            }
          }
        );
      }
    };
  }
})();
