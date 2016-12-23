(function() {
  'use strict';

  module.exports = GoVolunteerChildrenCount;

  GoVolunteerChildrenCount.$inject = ['GoVolunteerService'];

  function GoVolunteerChildrenCount(GoVolunteerService) {
    return {
      restrict: 'E',
      scope: {
        onSubmit: '&'
      },
      bindToController: true,
      controller: GoVolunteerChildrenCountController,
      controllerAs: 'goChildrenCount',
      templateUrl: 'childrenCount/goVolunteerChildrenCount.template.html'
    };

    function GoVolunteerChildrenCountController() {
      var vm = this;
      vm.childrenOptions = GoVolunteerService.childrenOptions;
      vm.childrenAttending = GoVolunteerService.childrenAttending;
      vm.submit = submit;
      vm.totalChildren = totalChildren;

      function submit() {
        vm.onSubmit({nextState: 'group-connector'});
      }

      function totalChildren() {
        var total = _.reduce(vm.childrenOptions, function(total, item) {
          return total + item.value;
        }, 0);

        return total;
      }
    }
  }

})();
