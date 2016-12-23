(function() {
  'use strict';
  module.exports = ChildCareNeed;

  ChildCareNeed.$inject = [];

  function ChildCareNeed() {
    return {
      restrict: 'E',
      templateUrl: 'childCareNeed/childCareNeed.html',
      scope: {
        participantId: '=',
        onChange: '&'
      },
      controller: childCareNeedController,
      controllerAs: 'need',
      bindToController: true
    };

    function childCareNeedController() {
      /*jshint validthis: true */
      var vm = this;
      vm.currentValue = false;
      vm.onValueChange = onValueChange;

      function onValueChange() {
        vm.onChange()({
          participantId: vm.participantId,
          value: vm.currentValue
        });
      }
    }
  }

})();
