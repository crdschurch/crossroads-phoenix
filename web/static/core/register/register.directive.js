(function(){
  'use strict';
  
  module.exports = RegisterForm;

  RegisterForm.$inject = ['$log', 'AUTH_EVENTS'];

  function RegisterForm($log, AUTH_EVENTS){
    return {
      restrict: 'EA',
      templateUrl: 'register/register_form.html',
      require: 'registerForm',
      controller: 'RegisterController as register',
      bindToController: true,
      link: function(scope, elements, attrs, ctrl) {
        // If the parent template of this <register-form> needs to receive a callback after a successful
        // registration, instead of the default action
        if (attrs.registerCallback) {
          ctrl.registerCallback = scope.$eval(attrs.registerCallback);
        }

        // If the parent template of this <register-form> needs to receive a callback when Login link is clicked
        // instead of the default ui-sref="login" routing
        if (attrs.loginCallback) {
          ctrl.loginCallback = scope.$eval(attrs.loginCallback);
          ctrl.showLoginCallback = true;
        }
      }
    };
  }
})();
