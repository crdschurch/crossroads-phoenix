import CONSTANTS from 'constants';

export default class ChangeParticipantRoleController {
  constructor(GroupService, $anchorScroll, $rootScope, GroupDetailService) {
    this.groupService = GroupService;
    this.groupRoles = CONSTANTS.GROUP.ROLES;
    this.processing = false;
    this.anchorScroll = $anchorScroll;
    this.rootScope = $rootScope;
    this.groupDetailService = GroupDetailService;
  }

  $onInit() {
    this.currentRole = this.participant.groupRoleId;
  }

  submit() {
    if (this.hasRoleChanged()) {
      this.processing = true;
      this.groupService.updateParticipant(this.participant)
        .then((data) => {
          this.rootScope.$emit('notify', this.rootScope.MESSAGES.successfulSubmission);
        },
        (data) => {
          this.rootScope.$emit('notify', this.rootScope.MESSAGES.generalError);
        }).finally(() => {
          this.processing = false;
          this.cancel();
        });
      // Invoke the parent callback function
      this.submitAction();
    }
  }

  hasRoleChanged(){
    if (this.currentRole === this.participant.groupRoleId){
      return false;
    }
    return true;
  }

  isParticipant() {
    return (this.participant.groupRoleId === CONSTANTS.GROUP.ROLES.MEMBER);
  }

  isLeader() {
    return (this.participant.groupRoleId === CONSTANTS.GROUP.ROLES.LEADER);
  }

  isApprentice() {
    return (this.participant.groupRoleId === CONSTANTS.GROUP.ROLES.APPRENTICE);
  }

  isApprovedLeader() {
    return this.participant.isApprovedLeader === true;
  }

  isLeaderDisabled() {
    return !this.isLeader() && (!this.isApprovedLeader() || this.warningLeaderMax());
  }

  warningLeaderMax() {
    let countLeaders = 0;
    if (!this.groupDetailService.participants) {
      countLeaders = 0;
    }
    else {
      countLeaders = this.groupDetailService.participants.filter(function (val) {
        return val.groupRoleId === CONSTANTS.GROUP.ROLES.LEADER;
      }).length;
    }

    if (countLeaders >= CONSTANTS.GROUP.MAX_LEADERS) {
      return true;
    }
    return false;
  }

  isApprenticeDisabled() {
    return !this.isApprentice() && this.warningApprenticeMax();
  }

  warningApprenticeMax() {
    let countApprentices = 0;
    if (!this.groupDetailService.participants) {
      countApprentices = 0;
    }
    else {
      countApprentices = this.groupDetailService.participants.filter(function (val) {
        return val.groupRoleId === CONSTANTS.GROUP.ROLES.APPRENTICE;
      }).length;
    }
    if (countApprentices >= CONSTANTS.GROUP.MAX_APPRENTICE) {
      return true;
    }
    return false;
  }

  cancel(changeParticipantForm) {
    // Invoke the parent callback function
    changeParticipantForm.$rollbackViewValue();
    this.cancelAction();
    this.anchorScroll();
  }
}
