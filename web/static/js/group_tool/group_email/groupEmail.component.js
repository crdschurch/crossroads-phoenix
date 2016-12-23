
import controller from './groupEmail.controller';

GroupEmailComponent.$inject = [];

export default function GroupEmailComponent() {

  let groupEmailComponent = {
    bindings: {
      message: '<',
      header: '@',
    },
    restrict: 'E',
    templateUrl: 'group_email/groupEmail.html',
    controller: controller,
    controllerAs: 'groupEmail',
    bindToController: true
  };

  return groupEmailComponent;

}
