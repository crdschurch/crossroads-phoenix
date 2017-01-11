import controller from './countdownHeader.controller';

CountdownHeaderComponent.$inject = [];

export default function CountdownHeaderComponent() {

  let countdownHeaderComponent = {
    restrict: 'E',
    templateUrl: 'countdown_header/countdownHeader.html',
    controller: controller,
    controllerAs: 'countdown',
    bindToController: true
  }

  return countdownHeaderComponent;
}
