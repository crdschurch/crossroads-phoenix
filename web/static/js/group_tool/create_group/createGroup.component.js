import controller from './createGroup.controller';

CreateGroupComponent.$inject = [ ];

export default function CreateGroupComponent() {

  let createGroupComponent = {
    restrict: 'E',
    templateUrl: 'create_group/createGroup.html',
    controller: controller,
    controllerAs: 'createGroup',
    bindToController: true
  };

  return createGroupComponent;

}