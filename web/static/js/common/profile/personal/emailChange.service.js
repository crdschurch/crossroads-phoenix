/* ngInject */
class EmailChangeService { 
  constructor() {
    this.originalEmail = '';
    this.isSet = false;
  }

  setEmail(emailAddress) {
      if (!this.isSet) {
          this.originalEmail = emailAddress;
          this.isSet = true;
      }
  }

  reset() {
      this.originalEmail = '';
      this.isSet = false;
  }

}

export default EmailChangeService;
