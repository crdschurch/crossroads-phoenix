(function() {
  'use strict';

  module.exports = PageRenderedService;

  PageRenderedService.$inject = ['$timeout', '$window'];

  function PageRenderedService($timeout, $window) {
    return {
      pageLoaded: function() {
        $timeout(pageLoaded);
      }
    }

    function pageLoaded() {
      tellPrerenderIoPageIsReady();
      intializeAddThis();
    }

    function tellPrerenderIoPageIsReady() {
      $window.prerenderReady = true;
    }

    function intializeAddThis() {
      if (!$window.addthis) {
        return;
      }

      configureAddThisPublicKey();
      $window.addthis.init();
    }

    function configureAddThisPublicKey() {
      $window.addthis_config = $window.addthis_config || {};
      $window.addthis_config.pubid = $window.addthis_config.pubid || "ra-5391d6a6145291c4";
    }
  }
})();
