import controller from './landing.controller';

export default function LandingComponent() {
  let landingComponent = {
    restrict: 'E',
    templateUrl: 'landing/landing.html',
    controller: controller,
    controllerAs: 'landing',
    bindToController: true
  };

  return landingComponent;
}

LandingComponent.$inject = [];
