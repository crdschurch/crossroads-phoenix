(function(){
  'use strict';

  module.exports = HumanizeFilter;

  HumanizeFilter.$inject = [];

  function HumanizeFilter() {
    return function(text) {
      if(text) {
        text = text.split('_');
        _.each(text, function(word,i) {
          word = word.toLowerCase();
          word = word.charAt(0).toUpperCase() + word.slice(1);
          text[i] = word;
        });
        return text.join(' ');
      }
    };
  }

})();

