
export default class GroupMessageController {
  /*@ngInject*/
  constructor($rootScope) {
    this.rootScope = $rootScope;
  }

  $onInit() {
    this.emailMessageRequired = Boolean(this.emailMessageRequired);  
    if(!this.emailMessageLabel) {
      this.emailMessageLabel = 'Your Message';
      if(!this.emailMessageRequired) {
        this.emailMessageLabel = `${this.emailMessageLabel} (Optional)`;
      }
    }
  }

  submit(groupMessageForm) {
    // Validate the form - if ok, then invoke the submit callback
    if(!groupMessageForm.$valid) {
      this.rootScope.$emit('notify', this.rootScope.MESSAGES.generalError);
      return;
    }
    this.submitAction({person: this.person});
  }

  cancel() {
    this.cancelAction({person: this.person});
  }

  hasSubHeaderText() {
    return !(this.subHeaderText === null || this.subHeaderText === undefined);
  }

  hasContactText() {
    return !(this.contactText === null || this.contactText === undefined);
  }

  hasEmailTemplateText() {
    return !(this.emailTemplateText === null || this.emailTemplateText === undefined);
  }
}