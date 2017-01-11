import controller from './countdownIntro.controller';

CountdownIntroComponent.$inject = [];

export default function CountdownIntroComponent() {

  let countdownIntroComponent = {
    restrict: 'E',
    templateUrl: 'countdown_intro/countdownIntro.html',
    controller: controller,
    controllerAs: 'countdown',
    bindToController: true
  };

  return countdownIntroComponent;
}
