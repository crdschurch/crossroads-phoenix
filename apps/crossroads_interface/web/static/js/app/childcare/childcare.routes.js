(function() {
  'use strict';

  module.exports = ChildcareRoutes;

  ChildcareRoutes.$inject = ['$stateProvider'];

  function ChildcareRoutes($stateProvider) {
    $stateProvider
      .state('childcare-event', {
        parent: 'noSideBar',
        url: '/childcare/:eventId',
        template: '<childcare></childcare>',
        data: {
          isProtected: true,
          meta: {
            title: 'Childcare Signup',
            description: 'Choose which of your children you want to enroll in childcare during your event'
          }
        },
        resolve: {
          loggedin: crds_utilities.checkLoggedin,
          $stateParams: '$stateParams',
          EventService: 'EventService',
          ChildCareEvents: 'ChildcareEvents',
          ChildcareService: 'ChildcareService',

          CurrentEvent: function($stateParams, EventService, ChildCareEvents) {
            return EventService.event.get({eventId: $stateParams.eventId}, function(event) {
              ChildCareEvents.setEvent(event);
            }).$promise;
          },

          ChildcareEvent: function(ChildCareEvents, ChildcareService, $stateParams) {
            return ChildcareService.ChildcareEvent.get({eventId: $stateParams.eventId}, function(event) {
              ChildCareEvents.setChildcareEvent(event);
            }).$promise;
          },

          Children: function(ChildCareEvents, ChildcareService) {
            return ChildcareService.Children.query(function(child) {
              ChildCareEvents.setChildren(child);
            }).$promise;
          }
        }
      })
      ;
  }

})();
