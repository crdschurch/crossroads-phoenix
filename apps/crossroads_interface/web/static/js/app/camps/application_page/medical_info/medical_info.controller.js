/* @ngInject */
class MedicalInfoController {
  constructor(MedicalInfoForm, $rootScope, $state) {
    this.medicalInfoForm = MedicalInfoForm.createForm();
    this.rootScope = $rootScope;
    this.go = $state.go;
    this.stateParams = $state.params;
    this.state = $state;
    this.viewReady = false;
    this.submitting = false;
    this.update = false;
  }

  $onInit() {
    this.model = this.medicalInfoForm.getModel();
    this.fields = this.medicalInfoForm.getFields();
    this.viewReady = true;
    this.update = this.stateParams.update;
  }

  cancel() {
    this.go('camps-dashboard');
    this.options.resetModel();
  }

  submit() {
    if (!this.submitting) {
      this.submitting = true;

      if (this.medicalInfo.$valid) {
        this.medicalInfoForm.save(this.stateParams.contactId).then(() => {
          this.rootScope.$emit('notify', this.rootScope.MESSAGES.successfulSubmission);
          this.nextPage(this.model.contactId);
          if (this.update) {
            // navigate back to mycamps page
            this.go('camps-dashboard');
          }
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

  nextPage(camperId) {
    this.go('campsignup.application', { page: 'product-summary', camperId });
  }
}

export default MedicalInfoController;
