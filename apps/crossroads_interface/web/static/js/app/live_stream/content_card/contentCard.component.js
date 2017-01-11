import controller from './contentCard.controller';

ContentCardComponent.$inject = [];

export default function ContentCardComponent() {

  let contentCardComponent = {
    restrict: 'E',
    templateUrl: 'content_card/contentCard.html',
    controller: controller,
    controllerAs: 'contentCard',
    bindToController: true,
    bindings: {
      content: '<'
    }
  }

  return contentCardComponent;
}