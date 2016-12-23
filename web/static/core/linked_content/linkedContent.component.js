import controller from './linkedContent.controller';

LinkedContentComponent.$inject = [];

export default function LinkedContentComponent() {

  let linkedContentComponent = {
    restrict: 'E',
    transclude: true,
    templateUrl: 'linked_content/linkedContent.html',
    controller: controller,
    controllerAs: 'content',
    bindToController: true,
    bindings: {
      href: '@',
      target: '@',
      title: '@',
      class: '@',
      background: '@'
    }
  }

  return linkedContentComponent;
}