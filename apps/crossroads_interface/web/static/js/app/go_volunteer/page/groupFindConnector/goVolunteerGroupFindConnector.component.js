(function() {
  'use strict';

  module.exports = GoVolunteerGroupFindConnector;

  GoVolunteerGroupFindConnector.$inject = ['$rootScope', 'GoVolunteerService', 'GroupConnectors'];

  function GoVolunteerGroupFindConnector($rootScope, GoVolunteerService, GroupConnectors) {
    return {
      restrict: 'E',
      scope: {
        onSubmit: '&'
      },
      bindToController: true,
      controller: GoVolunteerGroupFindConnectorController,
      controllerAs: 'goGroupFindConnector',
      templateUrl: 'groupFindConnector/goVolunteerGroupFindConnector.template.html'
    };

    function GoVolunteerGroupFindConnectorController() {
      var vm = this;
      vm.createGroup = createGroup;
      vm.disableCard = disableCard;
      vm.disabledReason = disabledReason;
      vm.displayResults = displayResults;
      vm.groupConnectors = GoVolunteerService.groupConnectors;
      vm.loaded = loaded;
      vm.loneWolf = loneWolf;
      vm.query = null;
      vm.showGroups = showGroups;
      vm.submit = submit;
      vm.youngest = youngestInRegistration();

      function createGroup() {
        vm.onSubmit({nextState: 'be-a-connector'});
      }

      function disableCard(group) {
        if (group.projectMinimumAge > vm.youngest) {
          return true;
        }

        if (group.projectType !== null) {
          if ((group.projectMaximumVolunteers - group.volunteerCount) < 1) {
            return true;
          }

          var regCount = registrationCount();
          if (group.absoluteMaximumVolunteers > group.projectMaximumVolunteers &&
              regCount > (group.absoluteMaximumVolunteers - group.volunteerCount)) {
            return true;
          }
        }

        return false;
      }

      function disabledReason(g) {
        if (g.projectMinimumAge > vm.youngest) {
          return 'Minimum age is ' + g.projectMinimumAge;
        }

        if (registrationCount() > (g.projectMaximumVolunteers - g.volunteerCount)) {
          return 'Group is full';
        }
      }

      function displayResults() {
        if (vm.query === null || vm.query.length < 3) {
          return false;
        }

        return true;
      }

      function handleError(err) {
        // show error page?
        // console.log(err);
      }

      function loaded() {
        return (vm.groupConnectors !== null && vm.groupConnectors.$resolved);
      }

      function loneWolf() {
        vm.onSubmit({nextState: 'launch-site'});
      }

      function registrationCount() {
        return 1 +
          GoVolunteerService.spouseAttending +
          GoVolunteerService.childrenAttending.childEightTwelve +
          GoVolunteerService.childrenAttending.childThirteenEighteen;
      }

      function submit(g) {
        if (vm.disableCard(g)) {
          $rootScope.$emit('notify', $rootScope.MESSAGES.goVolunteerGroupDisabled);
          return -1;
        }

        GoVolunteerService.groupConnector = g;
        vm.onSubmit({nextState: 'unique-skills'});
      }

      function showGroups() {
        return vm.loaded() && vm.groupConnectors.length > 0;
      }

      function youngestInRegistration() {
        /*
         * attribute 7040 = 2-7 year olds
         * attribute 7041 = 8-13
         * attribute 7042 = 14-18
         */

        var youngest = _.reduce(GoVolunteerService.childrenOptions, function(curr, next) {
          if (next.attributeId === 7040 && next.value > 0) {
            return 2;
          }

          if (next.attributeId === 7041 && curr > 8 && next.value > 0) {
            return 8;
          }

          if (next.attributeId === 7042 && curr > 13 && next.value > 0) {
            return 13;
          }

          return curr;
        },

        18);

        return youngest;
      }
    }
  }

})();
