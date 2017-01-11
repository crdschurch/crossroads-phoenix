export default class CampWaiversController {
  /* @ngInject */
  constructor($stateParams, $rootScope, CampsService, Session, $state) {
    // Injectables
    this.$stateParams = $stateParams;
    this.rootScope = $rootScope;
    this.campsService = CampsService;
    this.session = Session;
    this.state = $state;

    // Constants
    this.GUARDIAN = 'guardian';
    this.APPROVE_LATER = 'approveLater';
    this.SELF = 'self';

    // Variables
    this.signature = null;

    this.camper = _.find(this.campsService.family,
                         f => f.contactId === Number($stateParams.contactId));
    if (this.camper === undefined) {
      this.state.go('campsignup.family', { campId: $stateParams.campId });
    }

    this.isSelf = Number(this.$stateParams.contactId) === Number(this.session.exists('userId'));
    this.processing = false;
  }

  $onInit() {
    this.waivers = this.campsService.waivers;

    // Determine if waivers have been previously signed
    let signee = 0;
    let accepted = true;

    if (this.waivers.length > 0) {
      _.forEach(this.waivers, (waiver) => {
        signee = waiver.signee;
        accepted = accepted && waiver.accepted;
      });
    }

    if (signee > 0) {
      if (accepted) {
        if (Number(this.$stateParams.contactId) === signee) {
          this.signature = this.SELF;
        } else {
          this.signature = this.GUARDIAN;
        }
      } else {
        this.signature = this.APPROVE_LATER;
      }
    }
  }

  getFullName() {
    return `${this.camper.preferredName} ${this.camper.lastName}`;
  }

  submitWaivers() {
    if (this.form.$invalid) {
      this.rootScope.$emit('notify', this.rootScope.MESSAGES.generalError);
      return;
    }

    const accepted = this.signature === this.GUARDIAN || this.signature === this.SELF;
    const params = [];

    _.forEach(this.waivers, (waiver) => {
      params.push({
        waiverId: waiver.waiverId,
        accepted
      });
    });

    this.processing = true;
    this.campsService.submitWaivers(this.$stateParams.campId, this.$stateParams.contactId, params)
      .then(() => {
        this.rootScope.$emit('notify', this.rootScope.MESSAGES.successfulSubmission);

        this.state.go('campsignup.application', {
          page: 'medical-info',
          contactId: this.$stateParams.contactId
        });
      }, () => {
        this.rootScope.$emit('notify', this.rootScope.MESSAGES.generalError);
      }).finally(() => {
        this.processing = false;
      });
  }
}
