(function(){
  'use strict';

  module.exports = GroupInfoService;

  GroupInfoService.$inject = ['Session', 'Group', 'GROUP_API_CONSTANTS', 'AUTH_EVENTS', '$rootScope', 'Address'];

  function GroupInfoService(Session, Group, GROUP_API_CONSTANTS, AUTH_EVENTS, $rootScope, Address) {
    var requestPromise = null;

    //
    // Group Info service definition
    //
    var groupInfo = {};
    var groups = {
      hosting: [],
      participating: []
    };

    groupInfo.loadGroupInfo = loadGroupInfo;
    groupInfo.getHosting = getHosting;
    groupInfo.getParticipating = getParticipating;
    groupInfo.findHosting = findHosting;
    groupInfo.findParticipating = findParticipating;
    groupInfo.findParticipatingOrHost = findParticipatingOrHost;
    groupInfo.isParticipatingOrHost = isParticipatingOrHost;

    // Clear the group info cache when the user logs out
    $rootScope.$on(AUTH_EVENTS.logoutSuccess, reset);

    // Clear and reload
    $rootScope.$on('groupFinderReloadGroups', reloadGroups);

    //
    // Initialize the data
    //
    function loadGroupInfo(forceReload) {
      if (!requestPromise || forceReload) {
        requestPromise = Group.Type.query({groupTypeId: GROUP_API_CONSTANTS.GROUP_TYPE_ID}).$promise;
        requestPromise.then(function(data) {
          // Clear existing data before reloading to avoid duplicates
          clearData();

          // Process the database groups
          var cid = Session.exists('userId');
          if (cid) {
            _.each(data, function(group) {

              // default to something
              if (group.contactId === parseInt(cid)) {
                group.isHost = true;
                if (_.has(group.singleAttributes[73].attribute, 'description')) {
                  group.type = group.singleAttributes[73].attribute.description;
                }
                groups.hosting.push(group);

                // Query the other participants of the group
                queryParticipants(group);
              } else {
                group.isHost = false;
                groups.participating.push(group);
              }

              // Determine if group is private
              if (!group.meetingTime || !group.meetingDayId || !group.address) {
                group.isPrivate = true;
              }

              group.mapLink = Address.mapLink(group.address);

              // Parse the host's name
              parseContactName(group);

              // Convert the meetingDayId and the meetingTime into the client formats
              processMeetingDayAndTime(group);
            });
          }
          $rootScope.$emit('groupFinderInfoLoaded');
          return groups;
        }, function error() {
          // An error occurred, clear the promise so another attempt can be made
          requestPromise = null;
        });
      }

      return requestPromise;
    }

    //
    // Service implementation
    //

    function getHosting() {
      return groups.hosting;
    }

    function getParticipating() {
      return groups.participating;
    }

    function findHosting(groupId) {
      return _.find(groups.hosting, function(group) {
        return group.groupId === parseInt(groupId);
      });
    }

    function findParticipating(groupId) {
      return _.find(groups.participating, function(group) {
        return group.groupId === parseInt(groupId);
      });
    }

    function findParticipatingOrHost(groupId) {
      var group = findParticipating(groupId);
      if (!group) {
        group = findHosting(groupId);
      }

      return group;
    }

    function isParticipatingOrHost(groupId) {
      var group = findParticipatingOrHost(groupId);
      return !!group;
    }

    function queryParticipants(group) {
      Group.Participant.query({ groupId: group.groupId }).$promise.then(function(data) {
        var members = [];

        _.each(data, function(person) {
          members.push({
            contactId: person.contactId,
            participantId: person.participantId,
            groupRoleId: person.groupRoleId,
            groupRoleTitle: person.groupRoleTitle,
            emailAddress: person.email,
            firstName: person.nickName,
            lastName: person.lastName,
            affinities: parseAffinity(person.singleAttributes)
          });
        });

        group.members = members;
      });
    }

    function parseAffinity(attributes) {
      return _.compact(
        _.map(attributes, function(attributeType) {
          if (_.has(attributeType.attribute, 'description') && attributeType.attribute.description) {
            return attributeType.attribute.description;
          }
        })
      );
    }

    function parseContactName(group) {
      if (group.contactName) {
        group.contact = {};

        var tokens = group.contactName.split(/ *, */);
        group.contact.lastName = tokens[0];
        if (tokens.length > 1) {
          group.contact.firstName = tokens[1];
        }
      }
    }

    function processMeetingDayAndTime(group) {
      var meetingTime = moment().format('YYYY-MM-DD') + ' ' + group.meetingTime;

      group.meetingDay = moment().isoWeekday(group.meetingDayId - 1).format('dddd');
      var time = moment(meetingTime);
      var format = 'h a';
      if (time.minutes() !== 0) {
        format = 'h:mm a';
      }
      group.meetingHour = time.format(format);
    }

    function reset() {
      requestPromise = null;
      clearData();
    }

    function clearData() {
      groups.hosting = [];
      groups.participating = [];
    }

    function reloadGroups() {
      reset();
      loadGroupInfo();
    }

    //
    // Return the service
    //

    return groupInfo;
  }

})();
