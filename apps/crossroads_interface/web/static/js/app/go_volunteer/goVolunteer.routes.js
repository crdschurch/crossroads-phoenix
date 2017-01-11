(function() {
  'use strict';

  module.exports = GoVolunteerRoutes;
  var cookieNames = require('crds-constants').COOKIES;

  GoVolunteerRoutes.$inject = ['$stateProvider', '$urlMatcherFactoryProvider', '$locationProvider'];

  function GoVolunteerRoutes($stateProvider, $urlMatcherFactory, $locationProvider) {

    //$urlMatcherFactory.strictMode(false);

    crds_utilities.preventRouteTypeUrlEncoding($urlMatcherFactory, 'goVolunteerRouteType', /\/go-volunteer\/.*$/);

    $urlMatcherFactory.caseInsensitive(true);

    $stateProvider
      .state('go-volunteer', {
        parent: 'goCincinnati',
        abstract: true
      })
      .state('go-volunteer.city', {
        parent: 'goCincinnati',
        url: '/go-volunteer/:city',
        template: '<go-volunteer-city></go-volunteer-city>',
        data: {
          meta: {
            title: 'Some Title',
            description: ''
          }
        },
        resolve: {
          $stateParams: '$stateParams',
          Page: 'Page',
          $q: '$q',
          GoVolunteerService: 'GoVolunteerService',
          CmsInfo: CmsInfo,
          Meta: Meta
        }
      })
      .state('go-volunteer.city.organizations', {
        parent: 'goCincinnati',
        url: '/go-volunteer/:city/organizations',
        template: '<go-volunteer-organizations></go-volunteer-organizations>',
        data: {
          meta: {
            title: 'Some Title',
            description: ''
          }
        },
        resolve: {
          CmsInfo: CmsInfo,
          Meta: Meta,
          $state: '$state',
          LoggedIn: function($state) {
            if (crds_utilities.getCookie(cookieNames.SESSION_ID) !== undefined) {
              $state.go('go-volunteer.crossroadspage', {page: 'profile'});
            }
          }
        }
      })
      .state('go-volunteer.signinpage', {
        parent: 'goCincinnati',
        url: '/go-volunteer/cincinnati/crossroads/signin',
        template: '<go-volunteer-signin> </go-volunteer-signin>',
        data: {
          meta: {
            title: 'Some Title',
            description: ''
          }
        },
        resolve: {
          $state: '$state',
          CmsInfo: CmsInfo,
          Meta: Meta
        }
      })
      .state('go-volunteer.crossroadspage', {
        parent: 'goCincinnati',
        url: '/go-volunteer/cincinnati/crossroads/:page',
        template: '<go-volunteer-page></go-volunteer-page>',
        data: {
          meta: {
            title: 'Some Title',
            description: ''
          },
          isProtected: true
        },
        resolve: {
          Meta: Meta,
          Profile: 'Profile',
          Organizations: 'Organizations',
          $cookies: '$cookies',
          Session: 'Session',
          $stateParams: '$stateParams',
          SkillsService: 'SkillsService',
          loggedin: crds_utilities.optimisticallyCheckLoggedin,
          $q: '$q',
          GoVolunteerService: 'GoVolunteerService',
          Person: Person,
          GroupFindConnectors: GroupFindConnectors,
          PrepWork: PrepWork,
          Spouse: GetSpouse,
          Organization: Organization,
          Equipment: Equipment,
          ChildrenOptions: ChildrenOptions,
          CmsInfo: CmsInfo,
          Locations: Locations,
          ProjectTypes: ProjectTypes,
          Skills: Skills
        }
      })
      .state('go-volunteer.cms', {
        parent: 'goCincinnati',
        url: '/go-volunteer/:city/:cmsPage',
        template: '<go-volunteer-cms></go-volunteer-cms>',
        data: {
          meta: {
            title: 'Some Title',
            description: ''
          }
        },
        resolve: {
          $stateParams: '$stateParams',
          $q: '$q',
          CmsInfo: CmsInfo,
          Meta: Meta,
          Organization: Organization,
          Locations: Locations,
        }
      })
      .state('go-volunteer.page', {
        parent: 'goCincinnati',
        url: '/go-volunteer/:city/:organization/:page',
        template: '<go-volunteer-page></go-volunteer-page>',
        data: {
          meta: {
            title: 'Some Title',
            description: ''
          }
        },
        resolve: {
          $stateParams: '$stateParams',
          $q: '$q',
          SkillsService: 'SkillsService',
          CmsInfo: CmsInfo,
          Meta: Meta,
          GroupFindConnectors: GroupFindConnectors,
          Organization: Organization,
          Locations: Locations,
          ProjectTypes: ProjectTypes,
          Skills: Skills,
          ChildrenOptions: ChildrenOptions,
          Equipment: Equipment,
          PrepWork: PrepWork
        }
      })
      ;
  }

  function addTrailingSlashIfNecessary(link) {
    if (link === '') {
      return link;
    }

    if (_.endsWith(link, '/') === false) {
      return link + '/';
    }

    return link;
  }

  function ChildrenOptions(GoVolunteerService, GoVolunteerDataService, $stateParams, $q) {
    var deferred = $q.defer();
    if ($stateParams.page === 'children-count' && _.isEmpty(GoVolunteerService.childrenOptions)) {
      GoVolunteerDataService.Children.query(function(d) {
        GoVolunteerService.childrenOptions = d;
        deferred.resolve();
      },

      function(err) {

        console.error(err);
        deferred.reject();
      });
    } else {
      deferred.resolve();
    }

    return deferred.promise;
  }

  function CmsInfo(Page, $state, $stateParams, GoVolunteerService, $q, $window) {
    var city = $stateParams.city || 'cincinnati';
    $window.sessionStorage.setItem('go-volunteer.city', city);
    var organization = $stateParams.organizations || undefined;
    var link = buildLink(city, organization, $state, $stateParams);
    var deferred = $q.defer();
    var page = Page.get({ url: link });
    page.$promise.then(function(data) {
      GoVolunteerService.cmsInfo = data;
      deferred.resolve();
    }, function() {

      deferred.reject();
    });

    return deferred.promise;
  }

  function Equipment(GoVolunteerService, GoVolunteerDataService, $stateParams, $q) {
    var deferred = $q.defer();
    if ($stateParams.page === 'equipment' && _.isEmpty(GoVolunteerService.availableEquipment)) {
      GoVolunteerDataService.Equipment.query(function(d) {
        GoVolunteerService.availableEquipment = d;
        deferred.resolve();
      },

      function(err) {

        console.error(err);
        deferred.reject();
      });
    } else {
      deferred.resolve();
    }

    return deferred.promise;
  }

  function GetSpouse(Profile, $cookies, $q, GoVolunteerService, $stateParams) {
    var deferred = $q.defer();

    if ($stateParams.page === 'spouse') {
      var cid = $cookies.get('userId');
      if (!cid) {
        deferred.reject();
      } else if (GoVolunteerService.spouse.preferredName === undefined) {
        Profile.Spouse.get({contactId: cid}, function(data) {
          GoVolunteerService.spouse = data;
          if (data.preferredName !== undefined) {
            GoVolunteerService.spouse.fromDb = true;
          }

          deferred.resolve();
        }, function(err) {

          console.log(err);
          deferred.reject();
        });
      } else {
        deferred.resolve();
      }
    } else {
      deferred.resolve();
    }

    return deferred.promise;
  }

  function Locations($cookies, $q, GoVolunteerService, $stateParams, Organizations) {
    var deferred = $q.defer();

    if ($stateParams.page === 'launch-site' && 
        _.isEmpty(GoVolunteerService.launchSites) && 
        GoVolunteerService.organization.organizationId) {
      Organizations.LocationsForOrg.query({orgId: GoVolunteerService.organization.organizationId}, function(data) {
        GoVolunteerService.launchSites = data;
        deferred.resolve();
      }, function(err) {

        console.log(err);
        deferred.reject();
      });
    } else {
      deferred.resolve();
    }

    return deferred.promise;
  }

  function Meta($state, $stateParams) {
    var city = $stateParams.city || 'cincinnati';
    $state.next.data.meta.title = 'GO ' + city;
  }

  function Person(Profile, $cookies, $q, GoVolunteerService, $stateParams, Session) {
    var deferred = $q.defer();

    if ($stateParams.page === 'profile' && _.isEmpty(GoVolunteerService.person.emailAddress)) {
      var cid = $cookies.get('userId');
      if (GoVolunteerService.person.nickName === '') {
        Profile.Person.get({contactId: cid}, function(data) {
          Session.beOptimistic = true;
          GoVolunteerService.person = data;
          deferred.resolve();
        }, function(err) {

          console.log(err);
          deferred.reject();
        });
      } else {
        deferred.resolve();
      }
    } else {
      deferred.resolve();
    }

    return deferred.promise;
  }

  function PrepWork(GoVolunteerService, GoVolunteerDataService, $stateParams, $q) {
    var deferred = $q.defer();
    if ($stateParams.page === 'available-prep' && _.isEmpty(GoVolunteerService.prepWork)) {
      GoVolunteerDataService.PrepWork.query(function(data) {
        GoVolunteerService.prepWork = data;
        deferred.resolve();
      },

      function(err) {
        deferred.reject();
      });
    } else {
      deferred.resolve();
    }

    return deferred.promise;
  }

  function Skills(GoVolunteerService, SkillsService, $stateParams, $q) {
    var deferred = $q.defer();
    if ($stateParams.page === 'unique-skills' && _.isEmpty(GoVolunteerService.skills)) {
      SkillsService.query(function(d) {
        GoVolunteerService.skills = d;
        deferred.resolve();
      },

      function(err) {

        console.err(err);
        deferred.reject();
      });

    } else {
      deferred.resolve();
    }

    return deferred.promise;
  }

  function Organization(GoVolunteerService, $state, $stateParams, $q, Organizations) {
    var deferred = $q.defer();
    var param = 'crossroads';
    if ($state.next.name === 'go-volunteer.page') {
      param = $stateParams.organization;
    }

    // did we already get this information?
    if (useCachedOrg(param, GoVolunteerService.organization)) {
      deferred.resolve();
    } else {
      Organizations.ByName.get({name: param}, function(data) {
        GoVolunteerService.organization = data;
        GoVolunteerService.launchSites = {};
        deferred.resolve();
      },

      function(err) {
        console.log('Error while trying to get organization ' + param);
        console.log(err);
        deferred.reject();
      });
    }

    return deferred.promise;
  }

  function GroupFindConnectors(GoVolunteerService, $state, $stateParams, $q, GroupConnectors) {
    var deferred = $q.defer();

    if ($stateParams.page === 'group-find-connector')  {
      if (GoVolunteerService.organization.openSignup) {
        GroupConnectors.OpenOrgs.query({initiativeId: 1}, function(data) {
          GoVolunteerService.groupConnectors = data;
          deferred.resolve();
        },

          function(err) {
            console.log(err);
            deferred.reject();
          }
        );
      } else {
        GroupConnectors.ByOrgId.query(
          {orgId: GoVolunteerService.organization.organizationId, initiativeId: 1}, function(data) {
          GoVolunteerService.groupConnectors = data;
          deferred.resolve();
        },

          function(err) {
            console.log(err);
            deferred.reject();
          }
        );
      }
    } else {
      deferred.resolve();
    }

    return deferred.promise;
  }

  function ProjectTypes(GoVolunteerService, $state, $stateParams, $q, GoVolunteerDataService) {
    var deferred = $q.defer();

    if ($stateParams.page === 'project-preference-one' && _.isEmpty(GoVolunteerService.projectTypes)) {
      GoVolunteerDataService.ProjectTypes.query(function(data) {
        GoVolunteerService.projectTypes = data;
        deferred.resolve();
      },

        function(err) {
          console.log(err);
          deferred.reject();
        });
    } else {
      deferred.resolve();
    }

    return deferred.promise;
  }

  function useCachedOrg(org, cachedOrg) {
    if (!_.isEmpty(cachedOrg)) {
      if (_.startsWith(cachedOrg.name.toLowerCase(), org.toLowerCase())) {
        return true;
      }
    }

    return false;
  }

  function buildLink(city, org, state, stateParams) {
    var base = '/go-volunteer/' + addTrailingSlashIfNecessary(city);
    if (state.next.name === 'go-volunteer.city.organizations') {
      return base + 'organizations/';
    }

    if (org) {
      return base + addTrailingSlashIfNecessary(org);
    }

    if (state.next.name === 'go-volunteer.cms') {
      return base + addTrailingSlashIfNecessary(stateParams.cmsPage);
    }

    if (state.next.name === 'go-volunteer.page' || state.next.name === 'go-volunteer.crossroadspage') {
      var organization = stateParams.organization || 'crossroads';
      organization = (organization === 'other') ? 'crossroads' : organization;
      base = base + 'organizations/' + organization + '/' +  addTrailingSlashIfNecessary(stateParams.page);
    }

    return base;
  }

})();
