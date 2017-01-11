(function() {
  'use strict';

  module.exports = ChildcareChild;

  ChildcareChild.$inject = [];

  function ChildcareChild() {
    return {
      restrict: 'E',
      scope: {
        child: '='
      },
      templateUrl: 'childcareChild/childcareChild.html',
      controller: ChildcareChildController,
      controllerAs: 'child',
      bindToController: true
    };

    function ChildcareChildController() {
      var vm = this;
    }
  }

})();
