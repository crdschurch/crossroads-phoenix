(function() {
  'use strict';

  module.exports = ChildcareEvent;

  ChildcareEvent.$inject = ['$rootScope', 'ChildcareService'];

  function ChildcareEvent($rootScope, ChildcareService) {
    return {
      restrict: 'E',
      scope: {
        childcareEvent: '=',
        children: '='
      },
      templateUrl: 'childcareEvent/childcareEvent.html',
      controller: ChildcareEventController,
      controllerAs: 'childcareEvent',
      bindToController: true
    };

    function ChildcareEventController() {
      var vm = this;
      vm.form = {};
      vm.saving = false;
      vm.submit = submit;

      ////////////////

      function submit() {
        vm.saving = true;

        var childrenToSave = _.chain(vm.children).filter(function(child) {
          return child.selected;
        }).map(function(child) {
          return child.participantId;
        }).value();

        if (_.isEmpty(childrenToSave)) {
          $rootScope.$emit('notify', $rootScope.MESSAGES.chooseOne);
          vm.saving = false;
          return false;
        } else {

          var participants = {
            eventId: vm.childcareEvent.EventId,
            participants: childrenToSave
          };

          ChildcareService.Participants.save(participants,
            function() {
              vm.saving = false;
              $rootScope.$emit('notify', $rootScope.MESSAGES.childcareSaveSuccessful);
            },

            function() {
              vm.saving = false;
              $rootScope.$emit('notify', $rootScope.MESSAGES.childcareSaveError);
            }

          );
          return true;
        }
      }
    }
  }

})();
