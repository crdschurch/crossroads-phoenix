(function () {
  'use strict';

  module.exports = function ReplaceNonAlphaNumericFilter() {
    return ReplaceNonAlphaNumeric;
  }

  function ReplaceNonAlphaNumeric(input) {
    if (input) {
      return input.replace(/[^a-zA-Z0-9_]/g, '-');
    }

    return input;
    ;
  }
})();