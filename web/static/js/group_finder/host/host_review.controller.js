(function(){
  'use strict';

  module.exports = HostReviewCtrl;

  HostReviewCtrl.$inject = [
    '$window',
    '$rootScope',
    '$scope',
    '$state',
    '$timeout',
    'Responses',
    'Group',
    'AuthenticatedPerson',
    'GROUP_API_CONSTANTS',
    'EMAIL_TEMPLATES',
    'Email',
    '$log',
    'GroupInvitationService',
    'GROUP_ROLE',
    'LookupDefinitions',
    'DAYS',
    'SERIES',
    'CONTACT_ID'
  ];

  function HostReviewCtrl($window,
                          $rootScope,
                          $scope,
                          $state,
                          $timeout,
                          Responses,
                          Group,
                          AuthenticatedPerson,
                          GROUP_API_CONSTANTS,
                          EMAIL_TEMPLATES,
                          Email,
                          $log,
                          GroupInvitationService,
                          GROUP_ROLE,
                          LookupDefinitions,
                          DAYS,
                          SERIES,
                          CONTACT_ID
  ) {
    var vm = this;

    vm.pending = true;
    vm.showPublish = true;
    vm.invalidTime = false;
    vm.responses = Responses.data;
    vm.host = AuthenticatedPerson;
    vm.lookup = LookupDefinitions.lookup;
    vm.startOver = startOver;
    vm.publish = publish;
    vm.lookupContains = LookupDefinitions.lookupContains;
    vm.getGroupAttributes = getGroupAttributes;
    vm.getGroupTime = getGroupTime;
    vm.formatTime = formatTime;
    vm.goBack = goBack;
    vm.capacity = capacity;
    vm.isPrivate = isPrivate;
    vm.initialize = initialize;

    function initialize() {
      if (Responses.data.completed_flow !== true) {
        $state.go('group_finder.host.questions');
      }

      if(vm.isPrivate()) {
        vm.publish();
      }

      var groupTitle = AuthenticatedPerson.displayName();

      vm.group = {
        groupTitle: groupTitle,
        time: vm.getGroupTime(),
        distance: '0 miles from you',
        description: vm.responses.description,
        type: vm.lookup[vm.responses.group_type].description,
        attributes: vm.getGroupAttributes(),
        editProfilePicture: true,
        contactId: AuthenticatedPerson.contactId
      };

      vm.pending = false;

      if (vm.responses.date_and_time.time === null) {
        vm.invalidTime = true;
        vm.showPublish = false;
      }
    }

    function startOver() {
      $scope.$parent.currentStep = 1;
      $state.go('group_finder.host.questions');
    }

    function publish() {
      vm.requestPending = true;
      vm.rejected = false;

      // Create the Group detail resource
      var group = new Group.Detail();

      // Set constants
      group.groupTypeId = GROUP_API_CONSTANTS.GROUP_TYPE_ID;
      group.ministryId = GROUP_API_CONSTANTS.MINISTRY_ID;
      group.startDate = GROUP_API_CONSTANTS.START_DATE;
      group.endDate = GROUP_API_CONSTANTS.END_DATE;

      // Group owner, name and description
      group.contactId = AuthenticatedPerson.contactId;
      group.groupName = moment().year() + ' ' + SERIES.title + ' ' + AuthenticatedPerson.lastName;
      group.groupDescription = '';
      group.congregationId = AuthenticatedPerson.congregationId;

      // Group size and availability
      group.availableOnline = true;
      group.remainingCapacity = vm.capacity();
      group.groupFullInd = vm.capacity() <= 0;
      group.waitListInd = false;
      group.childCareInd = false;

      group.address = {};

      if (vm.isPrivate() === false) {
        group.groupDescription = vm.responses.description;
        group.childCareInd = vm.responses.kids === 1;

        // meetingDayId is not zero based
        group.meetingDayId = DAYS.indexOf(vm.responses.date_and_time.day.toLowerCase()) + 1;
        group.meetingTime = vm.formatTime(vm.responses.date_and_time.time);
        group.address = {
          addressLine1: vm.responses.location.street,
          city: vm.responses.location.city,
          state: vm.responses.location.state,
          zip: vm.responses.location.zip
        };

        group.singleAttributes = Responses.getSingleAttributes(vm.lookup);

        var attributes = [];
        var petAttributeTypeId = null;
        _.each(vm.responses.pets, function (hasPet, id) {
          if (!petAttributeTypeId) {
            petAttributeTypeId = this.lookup[id].attributeTypeId;
          }
          if (hasPet) {
            attributes.push({'attributeId': id, 'selected': true});
          }
        }, {lookup: vm.lookup});

        group.attributeTypes = {};
        group.attributeTypes[petAttributeTypeId] = {
          attributeTypeId: petAttributeTypeId,
          attributes: attributes
        };
      }

      // Publish the group to the API and handle the response
      Group.Detail.save(group).$promise
        .then(function groupPublishSuccess(group) {
          $rootScope.$emit('groupFinderReloadGroups');
          var capacity = 1;
          if (Responses.data.marital_status === '7022') {
            capacity = 2;
          }

          // Created group successfully, go to confirmation page allowing the current execution to complete
          $timeout(function() {
            $state.go('group_finder.host.confirm');
          }, 100);

          // Send host confirmation emails
          var email = {
            groupId: group.groupId,
            fromContactId: AuthenticatedPerson.contactId,
            toContactId: AuthenticatedPerson.contactId,
            replyToContact: CONTACT_ID.HOST
          };

          if (!vm.isPrivate()) {
            email.templateId = EMAIL_TEMPLATES.HOST_PUBLIC_CONFIRM_EMAIL_ID;
            email.mergeData = {
              PreferredName: AuthenticatedPerson.nickName,
              AddressLine1: vm.responses.location.street,
              MeetingDay: vm.responses.date_and_time.day,
              MeetingTime: vm.formatTime(vm.responses.date_and_time.time)
            };
          } else {
            email.templateId = EMAIL_TEMPLATES.HOST_PRIVATE_CONFIRM_EMAIL_ID;
            email.mergeData = {};
          }

          Email.Mail.save(email).$promise.catch(function hostEmailError(error) {
            $log.error('Host email confirmation failed', error);
          });

          // User invitation service to add person to that group
          return GroupInvitationService.acceptInvitation(group.groupId,
            {capacity: capacity, groupRoleId: GROUP_ROLE.HOST, attributes: group.attributes});
        })
        .then(function hostInviteSuccess() {
            // Reload group to pick up host as member
            $rootScope.$emit('groupFinderReloadGroups');

            // Invitation acceptance was successful
            vm.accepted = true;
          })
        .catch(function chainError(error) {
            vm.rejected = true;
            vm.requestPending = false;
            vm.showPublish = false;
            $log.debug('An error occurred while publishing', error);
          });
    }

    function getGroupAttributes() {
      var ret = [];
      if (vm.lookupContains(vm.responses.kids, 'kid')) { ret.push('kids welcome'); }

      if (vm.responses.pets) {
        _.each(vm.responses.pets, function(value, id) {
          if (value) {
            if (vm.lookupContains(id, 'dog')) { ret.push('has a dog'); }
            if (vm.lookupContains(id, 'cat')) { ret.push('has a cat'); }
          }
        });
      }
      return ret;
    }

    function getGroupTime() {
      var dt = vm.responses.date_and_time;
      if (dt) {
        return dt['day'] + 's @ ' + vm.formatTime(dt['time']);
      }
    }

    function formatTime(time) {
      var meetingTime = moment(time);
      var format = 'h a';
      if (meetingTime.minutes() !== 0) {
        format = 'h:mm a';
      }
      return  meetingTime.format(format);
    }

    function goBack() {
      $window.history.back();
    }

    function capacity() {
      // capacity is total - filled + 1 to include the host
      return parseInt(vm.responses.total_capacity) - (parseInt(vm.responses.filled_spots));
    }

    function isPrivate() {
      return vm.responses && vm.capacity() <= 0;
    }

    // ------------------------------- //

    vm.initialize();

  }

})();
