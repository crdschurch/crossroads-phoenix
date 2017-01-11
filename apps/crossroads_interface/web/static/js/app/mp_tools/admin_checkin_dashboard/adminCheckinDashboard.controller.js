(function() {
  'use strict';

  module.exports = AdminCheckinDashboardController;

  AdminCheckinDashboardController.$inject = ['$scope', 'AuthService', 'CRDS_TOOLS_CONSTANTS', 'AdminCheckinDashboardService', 'EventService'];

  function AdminCheckinDashboardController($scope, AuthService, CRDS_TOOLS_CONSTANTS, AdminCheckinDashboardService, EventService) {
    var vm = this;
    vm.displayFilter = true;
    vm.site = {id: undefined};
    vm.eventsReady = false;
    vm.eventsLoading = false;
    vm.event = {id: undefined};
    vm.events = [];
    vm.eventRooms = [];
    vm.startDate = new Date();
    vm.endDate = new Date();
    vm.loadEvents = loadEvents;
    vm.loadRooms = loadRooms;
    vm.toggleFilter = toggleFilter;
    vm.reset = reset;

    vm.allowAdminAccess = function() {
      return (AuthService.isAuthenticated() && AuthService.isAuthorized(CRDS_TOOLS_CONSTANTS.SECURITY_ROLES.KidsClubTools));
    };

    $scope.$watch('checkinDashboard.startDate', loadEvents);
    $scope.$watch('checkinDashboard.endDate', loadEvents);

    function loadRooms() {
      vm.roomsLoading = true;
      vm.eventRooms = [];

      AdminCheckinDashboardService.checkinDashboard.get({ eventId: vm.event.id},
        function(data) {
          vm.eventRooms = data.rooms;
          vm.roomsLoading = false;
          vm.displayFilter = false;
        }
      );
    }

    function loadEvents() {
      reset();

      if (vm.site.id != undefined) {
        EventService.eventsBySite.query({ site: vm.site.id, startDate: vm.startDate, endDate: vm.endDate  }, function(data) {
          vm.events = data;
          vm.eventsLoading = false;
        });
      } else {
        vm.eventsReady = false;
        vm.eventsLoading = false;
      }
    }

    function toggleFilter() {
      vm.displayFilter = !vm.displayFilter;
    }

    function reset() {
      vm.eventsReady = true;
      vm.eventsLoading = true;
      vm.roomsLoading = false;
      vm.eventRooms = [];
    }
  }
})();
