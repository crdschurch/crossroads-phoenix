import controller from './editGroup.controller';

EditGroupComponent.$inject = [ ];

export default function EditGroupComponent() {

  let editGroupComponent = {
    restrict: 'E',
    templateUrl: 'edit_group/editGroup.html',
    controller: controller,
    controllerAs: 'editGroup',
    bindToController: true
  };

  return editGroupComponent;

}