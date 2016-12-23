(function() {
  'use strict';
  angular.module('crossroads.core').factory('AuthService', AuthService);

  AuthService.$inject = [
    '$http',
    '$rootScope',
    'Session',
    'AUTH_EVENTS'];

  function AuthService(
    $http,
    $rootScope,
    Session,
    AUTH_EVENTS) {
    var authService = {};

    authService.login = function(credentials) {
      return $http
        .post(__API_ENDPOINT__ + 'api/login', credentials).then(function(res) {
          Session.create(
            res.data.refreshToken,
            res.data.userToken,
            res.data.userTokenExp,
            res.data.userId,
            res.data.username);

          // The username from the credentials is really the email address
          // In a future story, the contact email address will always be in sync with the user email address.
          $rootScope.email = credentials.username;
          $rootScope.phone = res.data.userPhone;

          //TODO: we really need to refactor "username" to be nickname
          $rootScope.username = res.data.username;
          $rootScope.roles = res.data.roles;
          $rootScope.userid = res.data.userId;
          return res.data.username;
        });
    };

    authService.logout = function() {
      $rootScope.email = null;
      $rootScope.userPhone = null;
      $rootScope.username = null;
      $rootScope.userid = null;
      $rootScope.roles = null;
      Session.clear();
      $rootScope.$broadcast(AUTH_EVENTS.logoutSuccess);
    };

    //We are pretty sure they are copied from an example of how WE SHOULD be doing this,
    //instead we are using the above rootScope
    authService.isAuthenticated = function() {
      return Session.isActive();
    };

    authService.isAuthorized = function(authorizedRoles) {
      if (!angular.isArray(authorizedRoles)) {
        authorizedRoles = [authorizedRoles];
      }

      return (authService.isAuthenticated() &&
          (_.find($rootScope.roles, function(role) {
            return authorizedRoles.indexOf(role.Id) >= 0;
          }) !== undefined));
    };

    return authService;
  }

})();
