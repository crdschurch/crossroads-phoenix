
export default class GeolocationModalController {
  constructor($modalInstance, GeolocationService, $rootScope) {
    this.modalInstance      = $modalInstance;
    this.locationService = GeolocationService;

    this.rootScope = $rootScope;

    this.rootScope.$on('geolocationModalDismiss', () => {
      this.close();
    })
  }

  close() {
    this.locationService.modalDismissed = true;
    this.modalInstance.close();
  }

  dismiss() {
    this.modalInstance.close();
  }
}