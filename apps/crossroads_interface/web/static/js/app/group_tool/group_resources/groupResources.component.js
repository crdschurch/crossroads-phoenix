
import controller from './groupResources.controller';

GroupResourcesComponent.$inject = [];

export default function GroupResourcesComponent() {

  let groupResourcesComponent = {
    restrict: 'E',
    templateUrl: 'group_resources/groupResources.html',
    controller: controller,
    controllerAs: 'groupResources',
    bindToController: true
  };

  return groupResourcesComponent;
}