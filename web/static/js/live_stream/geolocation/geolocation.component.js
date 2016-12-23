import controller from './geolocation.controller';

GeolocationComponent.$inject = [];

export default function GeolocationComponent() {

  let geolocationComponent = {
    restrict: 'E',
    templateUrl: 'geolocation/geolocation.html',
    controller: controller,
    controllerAs: 'geolocation',
    transclude: true,
    bindToController: true,
    bindings: {
      isModal: '<'
    },
  }

  return geolocationComponent;
}