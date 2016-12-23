import controller from './groupDetail.participants.controller';

GroupDetailParticipantsComponent.$inject = [];

export default function GroupDetailParticipantsComponent() {

  let groupDetailParticipantsComponent = {
    restrict: 'E',
    templateUrl: 'participants/groupDetail.participants.html',
    controller: controller,
    controllerAs: 'groupDetailParticipants',
    bindToController: true
  };

  return groupDetailParticipantsComponent;

}