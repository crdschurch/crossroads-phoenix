(function() {
  'use strict';

  module.exports = LoginController;

  LoginController.$inject = [
    '$scope',
    '$rootScope',
    'AUTH_EVENTS',
    'MESSAGES',
    'AuthService',
    '$state',
    '$log',
    'Session',
    '$timeout',
    'User',
    'ImageService'];

  function LoginController(
    $scope,
    $rootScope,
    AUTH_EVENTS,
    MESSAGES,
    AuthService,
    $state,
    $log,
    Session,
    $timeout,
    User,
    ImageService) {

    var vm = this;
    vm.path = ImageService.ProfileImageBaseURL + vm.contactId;
    vm.defaultImage = ImageService.DefaultProfileImage;
    $scope.loginShow = false;
    $scope.newuser = User;
    $scope.credentials = {};
    $scope.credentials.username = $scope.newuser.email;
    $scope.passwordPrefix = 'login-page';
    $scope.checkEmail = function() {
      //This logic is crazy, needs some attention
      return ($scope.navlogin.username.$error.required &&
        $scope.navlogin.$submitted &&
        $scope.navlogin.username.$dirty ||
        $scope.navlogin.username.$error.required &&
        $scope.navlogin.$submitted &&
        !$scope.navlogin.username.$touched ||
        $scope.navlogin.username.$error.required &&
        $scope.navlogin.$submitted &&
        $scope.navlogin.username.$touched ||
        !$scope.navlogin.username.$error.required &&
        $scope.navlogin.username.$dirty &&
        !$scope.navlogin.username.$valid);
    };

    $scope.toggleDesktopLogin = function() {
      $scope.loginShow = !$scope.loginShow;
      if ($scope.registerShow) {
        $scope.registerShow = !$scope.registerShow;
        $scope.credentials.username = $scope.newuser.email;
        $scope.credentials.password = $scope.newuser.password;
      }
    };

    $scope.logout = function() {
      $state.go('logout');
      return;
    };

    $scope.login = function() {
      if (($scope.credentials === undefined) ||
          ($scope.credentials.username === undefined ||
          $scope.credentials.password === undefined)) {
        $scope.pending = true;
        $scope.loginFailed = false;
        $rootScope.$emit('notify', $rootScope.MESSAGES.generalError);
      } else {
        $scope.processing = true;
        AuthService.login($scope.credentials).then(function(user) {
          $scope.processing = false;
          $scope.loginShow = false;
          if ($scope.modal) {
            $scope.modal.close();
          }

          clearCredentials();

          // If the state name ends with login or register (like 'login' or 'give.one_time_login'),
          // either redirect to specified URL, or redirect to profile if URL is not specified.
          if (_.endsWith($state.current.name, 'login') || _.endsWith($state.current.name, 'register')) {
            $timeout(function() {
              if (Session.hasRedirectionInfo()) {
                var url = Session.exists('redirectUrl');
                var params = Session.exists('params');
                Session.removeRedirectRoute();
                if (params === undefined) {
                  $state.go(url);
                } else {
                  $state.go(url, JSON.parse(params));
                }
              } else {
                $state.go('profile.personal');
              }
            },

           500);
          } else if ($scope.loginCallback) {
            $scope.loginCallback();
          }

            $scope.loginFailed = false;
          $rootScope.showLoginButton = false;
          $scope.navlogin.$setPristine();
        },

        function() {
          $scope.pending = false;
          $scope.processing = false;
          $scope.loginFailed = true;
          $rootScope.$emit('notify', $rootScope.MESSAGES.generalError);
        });
      }
    };

    function clearCredentials() {
      if ($scope.credentials !== undefined) {
        $scope.credentials.username = undefined;
        $scope.credentials.password = undefined;
      }
    }
  };
})();
