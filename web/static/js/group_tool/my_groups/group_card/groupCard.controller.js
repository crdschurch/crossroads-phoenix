
export default class GroupCardController {
  /*@ngInject*/
  constructor($state) { 
    this.state = $state;
  }

  goToInvite() {
    this.state.go('grouptool.detail.requests', {groupId: this.group.groupId});
  }

  goToEdit() {
    this.state.go('grouptool.edit', {groupId: this.group.groupId});
  }
}
