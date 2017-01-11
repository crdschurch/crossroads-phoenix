import CONSTANTS from 'crds-constants';

export default class GroupCardController {
  /*@ngInject*/
  constructor($state, $rootScope, $window) {
    this.state = $state;
    this.rootScope = $rootScope;
    this.window = $window;
    this.emailOptions = [];
    this.emailOptions.push(
      {
        name: CONSTANTS.GROUP.EMAIL.COMPOSE_EMAIL_NAME,
        descriptionLine1: CONSTANTS.GROUP.EMAIL.COMPOSE_EMAIL_DESCRIPTION_LINE1,
        descriptionLine2: CONSTANTS.GROUP.EMAIL.COMPOSE_EMAIL_DESCRIPTION_LINE2,
        icon: CONSTANTS.GROUP.EMAIL.COMPOSE_EMAIL_ICON
      });
    this.emailOptions.push(
      {
        name: CONSTANTS.GROUP.EMAIL.COPY_EMAIL_NAME,
        descriptionLine1: CONSTANTS.GROUP.EMAIL.COPY_EMAIL_DESCRIPTION_LINE1,
        descriptionLine2: CONSTANTS.GROUP.EMAIL.COPY_EMAIL_DESCRIPTION_LINE2,
        icon: CONSTANTS.GROUP.EMAIL.COPY_EMAIL_ICON
      });
  }

  $onInit() {
    this.emailList = this.group.emailList();
  }

  goToInvite() {
    this.state.go('grouptool.detail.requests', { groupId: this.group.groupId });
  }

  openEmailClient() {
    this.window.location.href = `mailto:?bcc=${this.emailList}`;
  }

  goToEdit() {
    this.state.go('grouptool.edit', { groupId: this.group.groupId });
  }

  onCopySuccess() {
    this.rootScope.$emit('notify', this.rootScope.MESSAGES.copiedGroupEmailAddressesToClipboard);
  }

  onCopyError() {
    this.location.path('/groups/search/results').search('id', this.groupId);
    this.rootScope.$emit('notify', this.rootScope.MESSAGES.copiedGroupEmailAddressesToClipboardError);
  }

}
