
export default class MyGroupsController {

  /*@ngInject*/
  constructor(GroupService, ParticipantService) {
    this.groupService = GroupService;
    this.participantService = ParticipantService;

    this.groups = [];
    this.approvedLeader = false;
    this.ready = false;
    this.error = false;
    this.errorMsg = '';

    this.groupsEven = function() {
      return this.groups.length % 2 == 0;
    };

    this.groupsOdd = function() {
      return this.groups.length % 2 == 1;
    };
  }

  $onInit() {
    this.groupService.getMyGroups().then((smGroups) => {
      this.groups = smGroups;
      this.ready = true;
    },
    (err) => {
      this.errorMsg = `Unable to get my groups: ${err.status} - ${err.statusText}`;
      this.error = true;
      this.ready = true;
    });

    // Determine if this participant is a leader
    this.participantService.get().then((data) => {
        if (_.get(data, 'ApprovedSmallGroupLeader', false)) {
          this.approvedLeader = true;
        }
      },

      (err) => {
        this.log.error(`Unable to get Participant for logged-in user: ${err.status} - ${err.statusText}`);
      });

  }

}
