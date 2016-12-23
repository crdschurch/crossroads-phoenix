(function() {

  'use strict()';

  module.exports = EventSetupController;

  EventSetupController.$inject = [
      '$rootScope',
      'AuthService',
      'EventService',
      'CRDS_TOOLS_CONSTANTS',
  ];

  function EventSetupController($rootScope, AuthService, EventService, CRDS_TOOLS_CONSTANTS) {

    var vm = this;
    vm.viewReady = false;
    vm.site = {id: undefined};
    vm.template = {id: undefined};
    vm.event = {id: undefined};
    vm.eventTemplates = [];
    vm.events = [];
    vm.setup = setup;
    vm.loadEvents = loadEvents;
    vm.reset = reset;
    vm.eventsReady = false;
    vm.eventsLoading = true;
    vm.eventTemplatesLoading = true;
    vm.saving = false;
    vm.startDate = new Date();
    vm.endDate = new Date();

    vm.allowAdminAccess = function() {
      return (AuthService.isAuthenticated() && AuthService.isAuthorized(CRDS_TOOLS_CONSTANTS.SECURITY_ROLES.KidsClubTools));
    };

    ////////////////////////////////////////////

    function loadEvents() {
      reset();

      // load templates first
      EventService.eventTemplatesBySite.query({ site: vm.site.id }, function(data) {
        vm.eventTemplates = data;
        vm.eventTemplatesLoading = false;
      });

      // load events
      EventService.eventsBySite.query({ site: vm.site.id, startDate: vm.startDate, endDate: vm.endDate }, function(data) {
        vm.events = data;
        vm.eventsLoading = false;
      });
    }

    function setup() {
      vm.saving = true;
      EventService.eventSetup.save({eventtemplateid: vm.template.id, eventid: vm.event.id},
        function(response) {
          $rootScope.$emit('notify', $rootScope.MESSAGES.eventUpdateSuccess);
          vm.saving = false;
        },

        function(error) {
          $rootScope.$emit('notify', $rootScope.MESSAGES.generalError);
          vm.saving = false;
        });
    }

    function reset() {
      vm.eventsReady = true;
      vm.eventsLoading = true;
      vm.eventTemplatesLoading = true;
      vm.events = [];
      vm.eventTemplates = [];
    }


  }
})();
