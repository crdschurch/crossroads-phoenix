(function() {
  'use strict()';
  module.exports = AppRun;

  AppRun.$inject = ['$location', 'MPTools'];

  function AppRun($location, MPTools) {

      if($location.search()['ug'] !== undefined){
          MPTools.setParams($location);
      }
  }
})();
