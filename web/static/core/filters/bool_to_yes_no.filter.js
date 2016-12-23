(function(){
  'use strict()';
  module.exports = function boolToYesNoFilter(){
    return function(b) {
      return b === true ? 'Yes' : 'No';
    };
  };
})();