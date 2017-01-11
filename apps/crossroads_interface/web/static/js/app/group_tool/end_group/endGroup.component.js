import controller from './endGroup.controller';

EndGroupController.$inject = [ ];

export default function EndGroupController() {

  let EndGroupController = {
    bindings: {
      data: '<',
    },
    restrict: 'E',
    templateUrl: 'end_group/endGroup.html',
    controller: controller,
    controllerAs: 'endGroup',
    bindToController: true
  };

  return EndGroupController;

}