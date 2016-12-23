(function () {
  'use strict()';

  module.exports = function htmlReplaceEntitiesFilter() {
    return function (text) {
      return text ? String(text).replace(/&\w+?;/g, function (e) {
        switch (e) {
          case '&nbsp;':
            return ' ';
          case '&tab;':
            return '\t';
          case '&amp;':
            return '&';
          case '&copy;':
            return String.fromCharCode(169);
          default:
            return e;
        }
      }) : '';
    };
  };
})();
