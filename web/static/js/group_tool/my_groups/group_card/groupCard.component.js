
import controller  from './groupCard.controller';

GroupCardComponent.$inject = [ ];

export default function GroupCardComponent() {

  let cardComponent = {
    bindings: {
      detail: '<',
      group: '<'
    },
    templateUrl: 'group_card/groupCard.html',
    controller: controller,
    controllerAs: 'groupCard',
    bindToController: true
  };

  return cardComponent;

}
