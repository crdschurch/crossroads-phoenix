class CamperInfoController {
  /* @ngInject */
  constructor(LookupService, CampsService, CamperInfoForm, $rootScope, $state) {
    this.camperInfoForm = CamperInfoForm.createForm();
    this.lookupService = LookupService;
    this.campsService = CampsService;
    this.rootScope = $rootScope;
    this.state = $state;
    this.submitting = false;
    this.viewReady = false;
  }

  $onInit() {
    this.viewReady = true;
    this.model = this.camperInfoForm.getModel();
    this.fields = this.camperInfoForm.getFields();
  }

  submit() {
    // TODO: change contactId if it === 'new'
    this.submitting = true;

    if (this.infoForm.$valid) {
      this.camperInfoForm.save(this.state.toParams.campId).then((newCamperInfo) => {
        this.campsService.camperInfo = newCamperInfo;
        this.rootScope.$emit('notify', this.rootScope.MESSAGES.successfullRegistration);

        this.state.go('campsignup.application', {
          page: 'emergency-contact',
          contactId: this.state.toParams.contactId === 'new' ? newCamperInfo.contactId : this.state.toParams.contactId
        });
      },

      (data) => {
        if (data.status === 412) {
          this.state.go('campsignup.application', {
            page: 'camps-full'
          });
        } else {
          this.rootScope.$emit('notify', this.rootScope.MESSAGES.generalError);
        }
      }).finally(() => {
        this.submitting = false;
      });
    } else {
      this.submitting = false;
      this.rootScope.$emit('notify', this.rootScope.MESSAGES.generalError);
    }
  }
}

export default CamperInfoController;
