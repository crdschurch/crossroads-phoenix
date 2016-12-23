(function() {
  'use strict';
  module.exports = Focus;

  Focus.$inject = ['$timeout', '$window'];

  function Focus($timeout, $window) {
    var focusService = {
      focus: focus,
    };

    function focus(id) {
      $timeout(function() {
        var element = $window.document.getElementById(id);
        if (element) {
          element.focus();
        }
      });
    }

    return focusService;
  }

})();
