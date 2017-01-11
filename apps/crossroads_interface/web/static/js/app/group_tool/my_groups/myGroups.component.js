
import controller  from './myGroups.controller';

MyGroupsComponent.$inject = [ ];

export default function MyGroupsComponent() {

  let myGroupsComponent = {
    restrict: 'E',
    templateUrl: 'my_groups/myGroups.html',
    controller: controller,
    controllerAs: 'myGroups',
    bindToController: true
  };

  return myGroupsComponent;

}
