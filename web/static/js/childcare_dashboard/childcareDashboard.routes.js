export default function ChildcareRoutes($stateProvider) {
  $stateProvider.state('childcare-dashboard', {
    parent: 'centeredContentPage',
    url: '/childcare',
    template: '<childcare-dashboard></childcare-dashboard>',
    data: {
      isProtected: true,
      meta: {
        title: 'Childcare',
        description: ''
      }
    },
    resolve: {
      ChildcareDashboardService: 'ChildcareDashboardService',
      loggedin: crds_utilities.checkLoggedin,
      $cookies: '$cookies',
      $q: '$q',
      LookupService: 'LookupService',
      FetchChildcareDates: fetchChildcareDates,
      Congregations: fetchCongregations
    }
  });

  function fetchCongregations(LookupService, ChildcareDashboardService, $q) {
    var deferred = $q.defer();
    var lkups = LookupService.Congregations.query();
    lkups.$promise.then( (data) => {
      ChildcareDashboardService.congregations = data;
      deferred.resolve();
    }, (err) => {
      console.log(err);
      deferred.reject();
    });
    return deferred.promise;
  }

  function fetchChildcareDates(ChildcareDashboardService, $q) {
    var deferred = $q.defer();
    var cds = ChildcareDashboardService.fetchChildcareDates();
    cds.$promise.then((data) => {
      ChildcareDashboardService.childcareDates = data;
      deferred.resolve();
    }, (err) => {
      if (err.status === 406) {
        ChildcareDashboardService.headOfHouseholdError = true;
        deferred.resolve();
      }
      deferred.reject();
    });
    return deferred.promise;
  }

}
