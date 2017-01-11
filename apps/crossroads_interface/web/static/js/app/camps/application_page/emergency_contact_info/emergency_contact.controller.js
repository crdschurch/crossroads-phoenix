class EmergencyContactController {
  /* @ngInject */
  constructor(EmergencyContactForm, $rootScope, $state, $stateParams) {
    this.emergencyContactForm = EmergencyContactForm.createForm();
    this.rootScope = $rootScope;
    this.state = $state;
    this.stateParams = $stateParams;
    this.viewReady = false;
    this.submitting = false;
  }

  $onInit() {
    this.emergencyContactForm.load(this.stateParams.campId, this.stateParams.contactId)
      .then((formModel) => {
        this.viewReady = true;
        this.model = formModel;
        this.fields = this.emergencyContactForm.getFields();
      }).catch(() => {
        this.rootScope.$emit('notify', this.rootScope.MESSAGES.generalError);
      }).finally(() => {
        this.submitting = false;
      });
  }

  submit() {
    this.submitting = true;
    if (this.emergencyContact.$valid) {
      this.emergencyContactForm.save(this.stateParams.campId, this.stateParams.contactId).then(() => {
        this.rootScope.$emit('notify', this.rootScope.MESSAGES.successfulSubmission);
        this.state.go('campsignup.application', {
          page: 'camp-waivers',
          contactId: this.stateParams.contactId
        });
      }).catch(() => {
        this.rootScope.$emit('notify', this.rootScope.MESSAGES.generalError);
      }).finally(() => {
        this.submitting = false;
      });
    } else {
      this.submitting = false;
      this.rootScope.$emit('notify', this.rootScope.MESSAGES.generalError);
    }
  }
}

export default EmergencyContactController;
