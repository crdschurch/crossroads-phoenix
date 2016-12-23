(function() {
  'use strict';

  module.exports = GoVolunteerLaunchSite;

  GoVolunteerLaunchSite.$inject = ['GoVolunteerService', '$state'];

  function GoVolunteerLaunchSite(GoVolunteerService, $state) {
    return {
      restrict: 'E',
      scope: {
        onSubmit: '&'
      },
      bindToController: true,
      controller: GoVolunteerLaunchSiteController,
      controllerAs: 'goLaunchSite',
      templateUrl: 'launchSite/goVolunteerLaunchSite.template.html'
    };

    function GoVolunteerLaunchSiteController() {
      var vm = this;
      vm.locations = GoVolunteerService.launchSites;
      vm.submit = submit;
      vm.isCrossroadsSite = isCrossroadsSite;

      function submit(location) {
        GoVolunteerService.preferredLaunchSite = location;
        vm.onSubmit({nextState: 'project-preference-one'});
      }

      function isCrossroadsSite() {
        return ($state.current.name === 'go-volunteer.crossroadspage');
      }
    }
  }

})();
