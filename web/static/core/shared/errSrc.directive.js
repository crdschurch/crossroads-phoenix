(function() {
  'use strict';

  module.exports = errSrc;

  function errSrc() {
    return {
      link: function postLink(scope, element, attrs) {
        element.bind('error', function() {
            if (attrs.src != attrs.errSrc) {
              attrs.$set('src', attrs.errSrc);
            }
          });
      }
    };
  }

})();
