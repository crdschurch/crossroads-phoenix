(function() {
  'use strict';

  module.exports = PasswordService;

  PasswordService.$inject = ['$resource'];

  function PasswordService($resource) {
    return {
      ResetRequest: $resource(__API_ENDPOINT__ + 'api/requestpasswordreset'),
      VerifyResetToken: $resource(__API_ENDPOINT__ + 'api/verifyresettoken/:token/'),
      EmailExists: $resource(__API_ENDPOINT__ + 'api/lookup/0/find/'),
      ResetPassword: $resource(__API_ENDPOINT__ + 'api/resetpassword'),
      VerifyCredentials: $resource(__API_ENDPOINT__ + 'api/verifycredentials')
    };
  }

})();
