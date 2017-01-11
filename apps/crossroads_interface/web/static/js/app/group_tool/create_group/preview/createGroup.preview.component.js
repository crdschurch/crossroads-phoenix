import controller from './createGroup.preview.controller';

CreateGroupPreviewComponent.$inject = [ ];

export default function CreateGroupPreviewComponent() {

  let createGroupPreviewComponent = {
    bindings: {
      data: '<',
      edit: '<'
    },
    restrict: 'E',
    templateUrl: 'preview/createGroup.preview.html',
    controller: controller,
    controllerAs: 'createGroupPreview',
    bindToController: true
  };

  return createGroupPreviewComponent;

}