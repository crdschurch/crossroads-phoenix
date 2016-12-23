class CampDashboardController {
  constructor(CampsService, $state, $rootScope) {
    this.campsService = CampsService;
    this.state = $state;
    this.viewReady = false;
    this.rootScope = $rootScope;
  }

  $onInit() {
    this.data = this.campsService.dashboard;
    this.viewReady = true;

    // Display message if coming from the payments page
    if (this.state.toParams.wasPayment) {
      this.rootScope.$emit('notify', this.rootScope.MESSAGES.successfulSubmission);
    }
  }

  isDashboardEmpty() {
    return this.data.length < 1;
  }

  // eslint-disable-next-line class-methods-use-this
  fullName(lastName, nickName) {
    return `${nickName} ${lastName}`;
  }
}

export default CampDashboardController;
