import controller from './countdownHome.controller';

CountdownHomeComponent.$inject = [];

export default function CountdownHomeComponent() {

  let countdownHomeComponent = {
    restrict: 'E',
    templateUrl: 'countdown_home/countdownHome.html',
    controller: controller,
    controllerAs: 'countdown',
    bindToController: true
  }

  return countdownHomeComponent;
}