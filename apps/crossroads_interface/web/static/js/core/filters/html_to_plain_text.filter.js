(function(){
  'use strict()';
  module.exports = function htmlToPlainTextFilter(){
    return function(text) {
      return  text ? String(text).replace(/<[^>]+>/gm, '') : '';
    };
  };
})();
