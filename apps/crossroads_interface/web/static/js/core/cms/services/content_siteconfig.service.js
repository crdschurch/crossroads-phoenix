(function() {
  'use strict';

  module.exports = ContentSiteConfigService;

  ContentSiteConfigService.$inject = [];

  function ContentSiteConfigService() {
    var service = {
      siteconfig: {},
      getTitle: getTitle
    };

    function getTitle() {
      return _.isEmpty(service.siteconfig.title) ?
        'Crossroads' :
        service.siteconfig.title;
    }

    return service;
  }
})();
