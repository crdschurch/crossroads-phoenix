export default class AuthModalController {
  /*@ngInject*/
  constructor($modal, $modalInstance, options) {
    this.$modal = $modal;
    this.$modalInstance = $modalInstance;

    // Auth template options
    this.loginTitle = options.loginTitle;
    this.registerTitle = options.registerTitle;
    this.loginContentBlockId = options.loginContentBlockId;
    this.registerContentBlockId = options.registerContentBlockId;
    this.cancelButton = options.cancelButton || 'Cancel';

    // Target modal options for the originally requested modal
    this.modal = options.modal;

    // Show or hide the login / register forms
    this.registerView = false;

    //
    // These functions are used as callbacks in a $timeout by the <login-form> and <register-form> components
    // They must be defined in the constructor so that they can be bound to "this"
    //

    // This callback is invoked after a successful login or registration by the target forms
    this.authCallback = () => {
      this.$modalInstance.dismiss();
      this.$modal.open(this.modal);
    };

    // This callback is invoked by the <register-form> directive in order to switch back to the Login form
    this.showLogin = () => {
      this.registerView = false;
    };

    // This callback is invoked by the <login-form> directive in order to switch to the register form
    this.showRegister = () => {
      this.registerView = true;
    };

  }

  // Is there a title for the current view?
  hasTitle() {
    return ( this.registerView && this.registerTitle ) || ( !this.registerView && this.loginTitle );
  }

  // Get the title text for the current view
  title() {
    return this.registerView ? this.registerTitle : this.loginTitle;
  }

  // Is there a content block id for the current view?
  hasContentBlock() {
    return ( this.registerView && this.registerContentBlockId ) || ( !this.registerView && this.loginContentBlockId );
  }

  // Get the content block id for the current view
  contentBlockId() {
    return this.registerView ? this.registerContentBlockId : this.loginContentBlockId;
  }

  cancel() {
    this.$modalInstance.dismiss();
  }
}
