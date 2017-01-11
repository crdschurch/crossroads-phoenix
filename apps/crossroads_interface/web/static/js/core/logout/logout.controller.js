(function() {

  'use strict';
  module.exports = LogoutController;

  LogoutController.$inject = ['$rootScope', '$scope', '$log', 'AuthService', '$state', 'Session'];

  function LogoutController($rootScope, $scope, $log, AuthService, $state, Session) {
    $log.debug('Inside Logout-Controller');

    logout();

    function logout(){    
        AuthService.logout();
        Session.redirectIfNeeded($state);
    }
  }
})();
