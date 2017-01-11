(function () {
  'use strict';

  module.exports = GroupInvitationCtrl;

  GroupInvitationCtrl.$inject = [
    'Session',
    '$log',
    '$state',
    '$stateParams',
    'Email',
    'EMAIL_TEMPLATES',
    'GroupInfo',
    'GroupInvitationService',
    'GROUP_ROLE',
    'Responses',
    'AuthenticatedPerson',
    'CONTACT_ID',
    'LookupDefinitions',
    'GROUP_ID'
  ];

  function GroupInvitationCtrl (Session,
                                $log,
                                $state,
                                $stateParams,
                                Email,
                                EMAIL_TEMPLATES,
                                GroupInfo,
                                GroupInvitationService,
                                GROUP_ROLE,
                                Responses,
                                AuthenticatedPerson,
                                CONTACT_ID,
                                LookupDefinitions,
                                GROUP_ID
  ) {

    var vm = this;

    vm.groupId = $stateParams.groupId;
    vm.requestPending = true;
    vm.lookup = LookupDefinitions.lookup;
    vm.showInvite = false;
    vm.capacity = 0;
    vm.goToDashboard = goToDashboard;
    vm.initialize = initialize;
    vm.groupId = parseInt($stateParams.groupId);
    vm.alreadyJoined = false;
    vm.responses = Responses.data;
    vm.groupHelp = vm.groupId === GROUP_ID.NO_GROUP;
    vm.dateTimeString = dateTimesString;

    // if there are responses, then the user came through QA flow
    function initialize() {
      if (GroupInfo.isParticipatingOrHost(vm.groupId)) {
        vm.requestPending = false;
        vm.alreadyJoined = true;
      }

      if (isNaN(vm.groupId)) {
        Responses.clear();
        $state.go('group_finder.join');
      }

      if (vm.alreadyJoined === false) {
        if (_.has(vm.responses, 'completed_flow')) {
          vm.capacity = 1;

          // Set capacity to account for invited spouse
          if (LookupDefinitions.lookupContains(vm.responses.marital_status, 'same group')) {
            vm.capacity = 2;
            vm.showInvite = true;
          }
        }

        var participant = {
          capacityNeeded: vm.capacity,
          groupRoleId: GROUP_ROLE.PARTICIPANT,
          singleAttributes: Responses.getSingleAttributes(vm.lookup),
          attributeTypes: Responses.getMultiAttributes(vm.lookup, ['date_time_week', 'date_time_weekend'])
        };
        if (_.has(Responses.data, 'completed_flow')) {
          if (_.has(Responses.data, 'location')) {
            participant.address = {
              addressLine1: Responses.data.location.street,
              city: Responses.data.location.city,
              state: Responses.data.location.state,
              zip: Responses.data.location.zip
            };
          }
        }

        GroupInvitationService.acceptInvitation(vm.groupId, participant)
          .then(function invitationAccepted() {
            // Invitation acceptance was successful
            vm.accepted = true;

            // Force the group info cache to reload to pick up the invited user
            return GroupInfo.loadGroupInfo(true);
          })
          .then(function groupInfoLoadCompleted() {
            // Send a public or private invitation complete email
            var cid = Session.exists('userId');
            var email = {};
            if (vm.groupHelp) {
              vm.showInvite = false;
              email = {
                groupId      : GROUP_ID.NO_GROUP,
                fromContactId: AuthenticatedPerson.contactId,
                toContactId  : CONTACT_ID.JOURNEY,
                templateId   : EMAIL_TEMPLATES.NO_GROUP,
                mergeData    : {
                  PreferredName : AuthenticatedPerson.nickName,
                  LastName      : AuthenticatedPerson.lastName,
                  PastExperience: vm.lookup[vm.responses.prior_participation].name,
                  Goal          : vm.lookup[vm.responses.goals].name,
                  Gender        : vm.lookup[vm.responses.gender].name,
                  MaritalStatus : vm.lookup[vm.responses.marital_status].name,
                  WeekdayTimes  : vm.dateTimeString(vm.responses.date_time_week),
                  WeekendTimes  : vm.dateTimeString(vm.responses.date_time_weekend),
                  AddressLine1  : vm.responses.location.street,
                  City          : vm.responses.location.city,
                  State         : vm.responses.location.state,
                  PostalCode    : vm.responses.location.zip,
                  Email         : AuthenticatedPerson.emailAddress
                }
              };
            } else {
              var group = GroupInfo.findParticipatingOrHost(vm.groupId);
              if (cid && group) {
                email = {
                  groupId          : group.groupId,
                  replyToContact   : CONTACT_ID.JOURNEY,
                  fromContactId    : cid,
                  toContactId      : cid,
                  mergeData : {
                    HostName         : group.contact ? group.contact.firstName : null,
                    HostPreferredName: group.contact ? group.contact.firstName : null
                  }
                };

                if (!group.isPrivate) {
                  email.templateId = EMAIL_TEMPLATES.PARTICIPANT_PUBLIC_CONFIRM_EMAIL_ID;
                  email.mergeData.AddressLine1 = group.address.addressLine1;
                  email.mergeData.MeetingDay = group.meetingDay;
                  email.mergeData.MeetingTime = group.meetingHour;
                } else {
                  email.templateId = EMAIL_TEMPLATES.PARTICIPANT_PRIVATE_CONFIRM_EMAIL_ID;
                }
              } else {
                $log.error('Could not find the participant\'s group to send confirmation email');
              }
            }

            Email.Mail.save(email).$promise.catch(function emailError(error) {
              $log.error('Email confirmation failed', error);
            });
          })
          .catch(function(error) {
            // An error happened accepting the invitation
            vm.rejected = true;
            $log.error('An error happened while accepting a group invitation', error);
          })
          .finally(function() {
            vm.requestPending = false;
            Responses.clear();
          });
      }
    }

    function goToDashboard() {
      $state.go('group_finder.dashboard');
    }

    function dateTimesString(date_time) {
      return _.map(date_time, function(value, id) {
        if (value) {
          return vm.lookup[id].name;
        }
      }).toString();
    }

    vm.initialize();
  }
})();
