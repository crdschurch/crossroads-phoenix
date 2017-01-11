import controller from './stream.controller';

StreamComponent.$inject = [];

export default function StreamComponent() {

  let streamComponent = {
    restrict: 'E',
    templateUrl: 'stream/stream.html',
    controller: controller,
    controllerAs: 'stream',
    bindToController: true
  }

  return streamComponent;
}