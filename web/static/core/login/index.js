(function() {
  'use strict';

  angular.module('crossroads.core')
    .controller('LoginController', require('./login_controller'))
    .controller('PasswordController', require('./password_controller'))
      .controller('ResetPasswordController', require('./reset_password_controller'))
    .directive('loginForm', require('./login_form_directive'))
  ;

  require('./login_form.html');
  require('./login_page.html');
  require('./forgot_password.html');
  require('./reset_password.html');
})();
