(function() {
  'use strict';

  var moment = require('moment');

  module.exports = Childcare;

  Childcare.$inject = ['ChildcareEvents'];

  function Childcare(ChildcareEvents) {
    return {
      restrict: 'E',
      scope: { },
      templateUrl: 'childcare/childcare.html',
      controller: ChildcareController,
      controllerAs: 'childcare',
      bindToController: true
    };

    function ChildcareController() {
      var vm = this;

      // gets the route resolved event
      vm.childcareEvent = ChildcareEvents.childcareEvent;
      vm.children = ChildcareEvents.children;
      vm.event = ChildcareEvents.event;
      vm.getDate = getDate;
      vm.getTime = getTime;
      vm.noChildcare = noChildcare;

      var startDate = moment(vm.event.EventStartDate);
      var endDate = moment(vm.event.EventEndDate);

      //////////////////

      function getDate() {
        return startDate.format('MM/DD/YYYY');
      }

      function getTime() {
        var startTime = startDate.format('hh:mma');
        var endTime = endDate.format('hh:mma');
        return startTime + ' - ' + endTime;
      }

      function noChildcare() {
        return vm.childcareEvent.EventId === undefined;
      }
    }
  }

})();
