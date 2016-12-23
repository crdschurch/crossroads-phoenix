import controller from './changeParticipantRole.controller';

ChangeParticipantRoleComponent.$inject = [];

export default function ChangeParticipantRoleComponent() {

  let changeParticipantRoleComponent = {
    bindings: {
      participant: '=',
      cancelAction: '&',
      submitAction: '&'
    },
    restrict: 'E',
    templateUrl: 'change_participant_role/changeParticipantRole.html',
    controller: controller,
    controllerAs: 'changeParticipantRole',
    bindToController: true
  };

  return changeParticipantRoleComponent;

}
