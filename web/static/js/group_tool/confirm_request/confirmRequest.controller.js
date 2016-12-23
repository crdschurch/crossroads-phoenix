
import GroupMessage from '../model/groupMessage';

export default class ConfirmRequestController {
  /*@ngInject*/
  constructor($rootScope, MessageService, GroupService) {
    this.rootScope = $rootScope;
    this.messageService = MessageService;
    this.groupService = GroupService;

    this.processing = false;
    this.emailLeader = (this.emailLeader === undefined) ? false : this.emailLeader;

    this.multipleLeaders = false;
  }

  $onInit() {
    if(this.emailLeader){
      this.emailGroupLeader();
    }

    this.multipleLeaders = this.group.leaders().length > 1;
  }

  cancel() {
    if(!this.processing) {
      this.modalInstance.dismiss();
    }
  }

  requestToJoin() {
    if(!this.processing) {
      this.emailLeader = false;
    }
  }

  sendJoinRequest() {
    this.processing = true;

    this.groupService.submitJoinRequest(this.group.groupId).then(
        () => {
          this.rootScope.$emit('notify', this.rootScope.MESSAGES.groupToolRequestSuccess);
          this.modalInstance.dismiss();
        },
        (error) => {
          if (error.status === 409) {
            this.rootScope.$emit('notify', this.rootScope.MESSAGES.groupToolRequestFailure);
            this.modalInstance.dismiss();
          } else {
            this.rootScope.$emit('notify', this.rootScope.MESSAGES.failedResponse);
          }
        }
    ).finally(() => {
      this.processing = false;
    });
  }

  leaderDisplayName(participant) {
    return this.multipleLeaders ? participant.nickName : participant.getDisplayName();
  }

  emailGroupLeader() {
    if(!this.processing) {
      this.emailLeader = true;

      this.groupMessage = new GroupMessage();
      this.groupMessage.groupId = this.group.groupId;
      this.groupMessage.subject = '';
      this.groupMessage.body = '';
    }
  }

  sendEmail(form) {
    // Validate the form - if ok, then invoke the submit callback
    if(!form.$valid) {
      this.rootScope.$emit('notify', this.rootScope.MESSAGES.generalError);
      return;
    }

    this.processing = true;

    this.messageService.sendLeaderMessage(this.groupMessage).then(
        () => {
          this.groupMessage = undefined;
          this.modalInstance.dismiss();
          this.rootScope.$emit('notify', this.rootScope.MESSAGES.emailSent);
        },
        (error) => {
          this.rootScope.$emit('notify', this.rootScope.MESSAGES.emailSendingError);
        }
    ).finally(() => {
      this.processing = false;
    });
  }

  submit() {
    this.processing = true;
    this.sendJoinRequest();

    this.modalInstance.dismiss();
  }
}
