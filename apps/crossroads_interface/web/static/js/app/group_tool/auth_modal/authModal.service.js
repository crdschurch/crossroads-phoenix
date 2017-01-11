export default class AuthModalService {
  /*@ngInject*/
  constructor($log, $modal, Session) {
    this.$log = $log;
    this.$modal = $modal;
    this.session = Session;
  }

  // This replaces the $modal.open(...) call and will determine if the user needs to be authenticated first
  open(options) {
    this.$log.debug("Opening auth modal");

    // If the user is logged in, open the modal to the desired location
    if (this.session.isActive()) {
      this.showTargetModal(options.modal);
    } else {
      // User is not logged in, show the login form
      this.showAuth(options);
    }
  }

  // Open the target modal since the user is authenticated
  showTargetModal(modal) {
    this.$modal.open(modal);
  }

  // Open the login/register modal since the user does not have an active session
  showAuth(options) {
    this.$log.debug("Showing auth modal login");
    var modalInstance = this.$modal.open({
      templateUrl: 'auth_modal/authModal.html',
      controller: 'AuthModalController',
      controllerAs: 'authModal',
      size: 'md',
      resolve: {
        // Pass the target modal options to the auth modal component
        options: function() {
          return options;
        }
      }
    });
  }
}
