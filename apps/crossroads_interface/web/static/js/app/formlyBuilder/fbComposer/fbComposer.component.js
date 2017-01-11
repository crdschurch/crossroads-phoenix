import controller from './fbComposer.controller';
import html from './fbComposer.html';

FBComposerComponent.$inject = [];

export default function FBComposerComponent() {
  let fbComposerComponent = {
    bindings: {
      fields: '&'
    },
    restrict: 'E',
    template: html,
    controller: controller,
    controllerAs: 'ctrl',
    bindToController: true
  };
  return fbComposerComponent;
}