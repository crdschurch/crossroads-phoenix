
import controller from './groupDetail.invite.controller';

GroupDetailInviteComponent.$inject = [];

export default function GroupDetailInviteComponent() {

  let GroupDetailInviteComponent = {
    restrict: 'E',
    bindings: {
      groupId: '<',
      onUpdate: '&'
    },
    templateUrl: 'invite/groupDetail.invite.html',
    controller: controller,
    controllerAs: 'groupDetailInvite',
    bindToController: true
  };

  return GroupDetailInviteComponent;

}