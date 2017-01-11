import controller from './streamVideojs.controller';

StreamVideojsComponent.$inject = [];

export default function StreamVideojsComponent() {

  let streamVideojsComponent = {
    restrict: 'E',
    templateUrl: 'stream_videojs/streamVideojs.html',
    controller: controller,
    controllerAs: 'stream',
    bindToController: true
  }

  return streamVideojsComponent;
}