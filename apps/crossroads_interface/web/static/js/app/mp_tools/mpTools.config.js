(function(){
  'use strict()';

  module.exports = AppConfig;

  AppConfig.$inject = ['uiSelectConfig'];

  function AppConfig(uiSelectConfig) {
      uiSelectConfig.theme = 'bootstrap';
  }

})();
