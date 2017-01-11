class CampThankYouController {
  /* @ngInject */
  constructor(CampsService, $stateParams) {
    this.campsService = CampsService;
    this.stateParams = $stateParams;

    this.viewReady = false;
    this.submitting = false;

    this.payment = CampsService.payment;
  }

  $onInit() {
    this.viewReady = true;
  }

}

export default CampThankYouController;
