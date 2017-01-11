(function(){
  'use strict';

  module.exports = JoinReviewCtrl;

  JoinReviewCtrl.$inject = [
    '$scope',
    '$state',
    'Responses',
    'ZipcodeService',
    'GroupInvitationService',
    'LookupDefinitions',
    'GROUP_ID',
    'GROUP_ROLE',
    '$window',
    'Session'
  ];

  function JoinReviewCtrl(
    $scope,
    $state,
    Responses,
    ZipcodeService,
    GroupInvitationService,
    LookupDefinitions,
    GROUP_ID,
    GROUP_ROLE,
    $window,
    Session
  ) {
    var vm = this;
    vm.initialize = initialize;
    vm.goToHost = goToHost;
    vm.goToResults = goToResults;
    vm.lookup = LookupDefinitions.lookup;
    vm.goBack = goBack;
    vm.lookupContains = LookupDefinitions.lookupContains;

    function initialize() {

      vm.responses = Responses.data;
      vm.showUpsell = false;
      vm.showResults = vm.showUpsell === false;
      vm.contactCrds = false;
      vm.rejected = false;
      var meetTime = {
        week: true,
        weekend: true
      };

      // check of invalid date_times
      _.each(vm.responses.date_time_week, function(value, id) {
        if (value && vm.lookupContains(id, 'can\'t meet')) {
          meetTime.week = false;
        }
      });

      // check of invalid date_times
      _.each(vm.responses.date_time_weekend, function(value, id) {
        if (value && vm.lookupContains(id, 'can\'t meet')) {
          meetTime.weekend = false;
        }
      });

      vm.invalidTime = (!meetTime.week && !meetTime.weekend);

      // not selecting a time trumps all conditions
      if (vm.invalidTime === false) {
        if (vm.responses.location && vm.responses.location.zip) {
          vm.zipcode = parseInt(vm.responses.location.zip);
          if (ZipcodeService.isLocalZipcode(vm.zipcode) === false) {
            vm.showUpsell = false;
            vm.showResults = false;
            vm.contactCrds = true;

            var participant = {
              capacity: 1,
              contactId: parseInt(Session.exists('userId')),
              groupRoleId: GROUP_ROLE.PARTICIPANT,
              address: {
                addressLine1: vm.responses.location.street,
                city: vm.responses.location.city,
                state: vm.responses.location.state,
                zip: vm.responses.location.zip
              },
              singleAttributes: Responses.getSingleAttributes(vm.lookup),
              attributeTypes: Responses.getMultiAttributes(vm.lookup, ['date_time_week', 'date_time_weekend'])
            };

            vm.invalidTime = false; // set as an override

            var promise = GroupInvitationService.acceptInvitation(GROUP_ID.ANYWHERE, participant);
            promise.then(function() {
              // Invitation acceptance was successful
              vm.accepted = true;
            }, function(error) {
              // An error happened accepting the invitation
              vm.rejected = true;
            });
          }
        }

        if (vm.showResults === true && vm.contactCrds === false) {
          $state.go('group_finder.join.results');
        }

        if (parseInt(vm.responses.relationship_status) === 2) {
          $scope.showInvite = true;
        }
      }
    }

    function goToHost() {
      $state.go('group_finder.host');
    }

    function goToResults() {
      Responses.data.bypassUpsell = true;
      $state.go('group_finder.join.questions');
    }

    function goBack() {
      $window.history.back();
    }

    vm.initialize();

  }

})();
