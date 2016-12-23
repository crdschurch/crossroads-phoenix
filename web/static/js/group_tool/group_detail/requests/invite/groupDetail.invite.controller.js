
import CONSTANTS from 'crds-constants';
import GroupInvitation from '../../../model/groupInvitation';

export default class GroupDetailInviteController {
  /*@ngInject*/
  constructor(GroupService, $rootScope) {
    this.groupService = GroupService;
    this.rootScope = $rootScope;

    this.invite = null;
    this.processing = false;
  }

  $onInit() {
    this.beginInvitation();
  }

  beginInvitation() {
    this.processing = false;
    this.invite = new GroupInvitation();
    this.invite.groupRoleId = CONSTANTS.GROUP.ROLES.MEMBER;
    this.invite.sourceId = this.groupId;
  }

  cancel() {
    this.onUpdate({newView: 'List', refresh: true});
  }
    
  sendInvitation(form, invitation) {
    this.processing = true;
    if(!form.$valid) {
      this.processing = false;
      this.rootScope.$emit('notify', this.rootScope.MESSAGES.generalError);
      return;
    }
    invitation.requestDate = new Date();

    this.groupService.sendGroupInvitation(invitation).then(
      (/*data*/) => {
        this.invite = null;
        this.onUpdate({newView: 'List', refresh: true});
        this.rootScope.$emit('notify', this.rootScope.MESSAGES.emailSent);
      },
      (/*err*/) => {
        this.rootScope.$emit('notify', this.rootScope.MESSAGES.emailSendingError);
      }
    ).finally(() => {
      this.processing = false;
    });
  }
}