
(() => {
  function AppRun(Session,
    $rootScope,
    MESSAGES,
    $http,
    $log,
    $state,
    $timeout,
    $location,
    $cookies,
    $document,
    ContentSiteConfigService,
    SiteConfig,
    ContentPageService
  ) {
    function setupMetaData() {
      const title = ContentSiteConfigService.getTitle();
      const titleSuffix = ` | ${title}`; 
      $rootScope.meta.siteconfig = ContentSiteConfigService.siteconfig;
      if ($rootScope.meta.title.indexOf(titleSuffix, $rootScope.meta.title.length - titleSuffix.length) === -1) {
        $rootScope.meta.title = $rootScope.meta.title + titleSuffix;
      }
      $rootScope.meta.url = $location.absUrl();
      if (!$rootScope.meta.statusCode) {
        $rootScope.meta.statusCode = '200';
      }
      if (!$rootScope.meta.image || $rootScope.meta.image.filename === '/assets/') {
        $rootScope.meta.image = {
          filename:'https://crossroads-media.s3.amazonaws.com/images/coffee_cup.jpg'
        };
      }
    }

    function setOriginForCmsPreviewPane($injectedDocument) {
      const document = $injectedDocument[0];
      // work-around for displaying cr.net inside preview pane for CMS
      const domain = document.domain;
      const parts = domain.split('.');
      if (parts.length === 4) {
        // possible ip address
        const firstChar = parts[0].charAt(0);
        if (firstChar >= '0' && firstChar <= '9')  {
          // ip address
          document.domain = domain;
          return;
        }
      }
      while (parts.length > 2) {
        parts.shift();
      }
      document.domain = parts.join('.');
    }

    $rootScope.MESSAGES = MESSAGES;
    setOriginForCmsPreviewPane($document);
    fastclick.attach(document.body);

    // Detect Browser Agent. use for browser targeting in CSS
    const doc = document.documentElement;
    doc.setAttribute('data-useragent', navigator.userAgent);
    doc.setAttribute('data-platform', navigator.platform );

    $rootScope.$on('$stateChangeStart', (event, toState, toParams, fromState, fromParams) => {
      ContentPageService.reset();
      if (toState.name === 'logout') {
        if (fromState.data === undefined || !fromState.data.isProtected) {
          Session.addRedirectRoute(fromState.name, fromParams);
        } else {
          Session.addRedirectRoute('content', { link: '/' });
        }

        return;
      }
      if (toState.data !== undefined && toState.data.preventRouteAuthentication) {
        return;
      }
      Session.verifyAuthentication(event, toState.name, toState.data, toParams);
      Session.enableReactiveSso(event, toState.name, toState.data, toParams);
    });

    $rootScope.$on('$stateChangeSuccess', (event, toState) => {
      if (toState.data && toState.data.meta) {
        $rootScope.meta = toState.data.meta;
      }
      setupMetaData();
    });
  }

  AppRun.$inject = [
    'Session',
    '$rootScope',
    'MESSAGES',
    '$http',
    '$log',
    '$state',
    '$timeout',
    '$location',
    '$cookies',
    '$document',
    'ContentSiteConfigService',
    'SiteConfig',
    'ContentPageService'
  ];

  angular.module('crossroads.core').run(AppRun);
})();
