(function() {

  'use strict';

  module.exports = DateRange;

  DateRange.$inject = ['$log'];
  DateRangeController.$inject = ['$scope', 'Validation'];

  function DateRange($log) {
    return {
      restrict: 'EA',
      replace: true,
      scope: {
        startDate: '=',
        endDate: '=',
        minDate: '=',
        required: '@',
        startDateChange: '&',
        endDateChange: '&'
      },
      templateUrl: 'templates/dateRange.html',
      controller: DateRangeController,
      controllerAs: 'daterange',
      bindToController: true
    };
  }

  function DateRangeController($scope, Validation) {
    var vm = this;
    vm.activate = activate;
    vm.onEndDateChange = onEndDateChange;
    vm.openStartDatePicker = openStartDatePicker;
    vm.openEndDatePicker = openEndDatePicker;
    vm.required = vm.required === 'true' ? true : false;
    vm.update = update;
    vm.validate = Validation;

    ////////////////////////

    activate();

    function activate() {
      vm.startDateOpen = false;
      vm.endDateOpen = false;
      vm.currentDate = new Date();

      vm.dateOptions = {
        formatYear: 'yy',
        startingDay: 0,
        showWeeks: 'false',
      };

    }

    function openStartDatePicker($event) {
      $event.preventDefault();
      $event.stopPropagation();

      vm.startDateOpen = true;
    }

    function openEndDatePicker($event) {
      $event.preventDefault();
      $event.stopPropagation();

      vm.endDateOpen = true;
    }

    function update() {
      if (vm.endDate < vm.startDate) {
        vm.endDate = vm.startDate;
      }
      if(vm.startDateChange) {
        vm.startDateChange({startDate: vm.startDate});
      }
    }

    function onEndDateChange() {
      if(vm.endDateChange) {
        vm.endDateChange({endDate: vm.endDate});
      }
    }
  }
})();
