(function() {
  'use strict';

  angular.module('crossroads.core').service('Session', SessionService);

  var timeoutPromise;
  var cookieNames = require('crds-constants').COOKIES;

  SessionService.$inject = [
    '$log',
    '$http',
    '$state',
    '$interval',
    '$cookies',
    '$modal',
    '$injector',
    '$rootScope',
    '$q'];

  function SessionService(
    $log,
    $http,
    $state,
    $interval,
    $cookies,
    $modal,
    $injector,
    $rootScope,
    $q
  ) {
    var vm = this;

    vm.create = function(refreshToken, sessionId, userTokenExp, userId, username) {
      $log.debug('creating cookies!');
      var expDate = new Date();
      expDate.setTime(expDate.getTime() + (userTokenExp * 1000));
      $cookies.put(cookieNames.SESSION_ID, sessionId, {
        expires: expDate
      });
      $cookies.put('userId', userId);
      $cookies.put('username', username);
      $cookies.put(cookieNames.REFRESH_TOKEN, refreshToken, {
        expires: expDate
      });
      $http.defaults.headers.common.Authorization = sessionId;
      $http.defaults.headers.common.RefreshToken = refreshToken;
    };

    vm.refresh = function(response) {
      $log.debug('updating cookies!');
      var expDate = new Date();

      //TODO: Consider how we could make this less hard coded,
      // put the timeout in the header also?
      var sessionLength = 1800000;
      expDate.setTime(expDate.getTime() + sessionLength);
      if (timeoutPromise) {
        $interval.cancel(timeoutPromise);
      }

      timeoutPromise = $interval(
        function() {
          openStayLoggedInModal($injector, $state, $modal, vm);
        },

        sessionLength);

        
      $cookies.put(cookieNames.SESSION_ID, response.headers('sessionId'), {
        expires: expDate
      });
      $cookies.put(cookieNames.REFRESH_TOKEN, response.headers('refreshToken'), {
        expires: expDate
      });
      $http.defaults.headers.common.RefreshToken = response.headers('refreshToken');
      $http.defaults.headers.common.Authorization = response.headers('sessionId');
    };

    /*
     * This formats the family as a comma seperated string before storing in the
     * cookie called 'family'
     *
     * @param family - an array of participant ids
     */
    vm.addFamilyMembers = function(family) {
      $log.debug('Adding ' + family + ' to family cookie');
      $cookies.put('family', family.join(','));
    };

    /*
     * @returns an array of participant ids
     */
    vm.getFamilyMembers = function() {
      if (this.exists('family')) {
        return _.map($cookies.get('family').split(','), function(strFam) {
          return Number(strFam);
        });
      }

      return [];
    };

    vm.isActive = function() {
      var ex = this.exists(cookieNames.SESSION_ID);
      if (ex === undefined || ex === null) {
        return false;
      }

      return true;
    };

    vm.exists = function(cookieId) {
      return $cookies.get(cookieId);
    };

    vm.clear = function() {
      $cookies.remove(cookieNames.SESSION_ID);
      $cookies.remove(cookieNames.REFRESH_TOKEN);
      $cookies.remove('userId');
      $cookies.remove('username');
      $cookies.remove('family');
      $cookies.remove('age');
      $http.defaults.headers.common.Authorization = undefined;
      $http.defaults.headers.common.RefreshToken = undefined;
      return true;
    };

    vm.getUserRole = function() {
      return '';
    };

    //TODO: Get this working to DRY up login_controller and register_controller
    vm.redirectIfNeeded = function($state) {

      if (vm.hasRedirectionInfo()) {
        var url = vm.exists('redirectUrl');
        var params = vm.exists('params');
        vm.removeRedirectRoute();
        if (params === undefined) {
          $state.go(url);
        } else {
          $state.go(url, JSON.parse(params));
        }
      }
    };

    vm.addRedirectRoute = function(redirectUrl, params) {
      $cookies.put('redirectUrl', redirectUrl);
      $cookies.put('params', JSON.stringify(params));
    };

    vm.removeRedirectRoute = function() {
      $cookies.remove('redirectUrl');
      $cookies.remove('params');
    };

    vm.hasRedirectionInfo = function() {
      if (this.exists('redirectUrl') !== undefined) {
        return true;
      }

      return false;
    };

    vm.verifyAuthentication = function (event, stateName, stateData, stateToParams) {
      if (vm.isActive()) {
        var promise = $http({
          method: 'GET',
          url: __API_ENDPOINT__ + 'api/authenticated',
          withCredentials: true,
          headers: {
            Authorization: $cookies.get(cookieNames.SESSION_ID),
            RefreshToken: $cookies.get(cookieNames.REFRESH_TOKEN)
          }
        }).success(function (user) {
          $rootScope.userid = user.userId;
          $rootScope.username = user.username;
          $rootScope.email = user.userEmail;
          $rootScope.phone = user.userPhone;
          $rootScope.roles = user.roles;
        }).error(function (e) {
          clearAndRedirect(event, stateName, stateToParams);
        });
	
        return promise;
      } else if (stateData !== undefined && stateData.isProtected) {
        clearAndRedirect(event, stateName, stateToParams);
      } else {
        $rootScope.userid = null;
        $rootScope.username = null;
      }

      var deferred = $q.defer();
      deferred.reject('User is not logged in.');
      return deferred.promise;
    }
   
    function clearAndRedirect(event, toState, toParams) {                       
      vm.clear();
      $rootScope.userid = null;
      $rootScope.username = null;
      $rootScope.email = null;
      $rootScope.phone = null;
      $rootScope.roles = null;

      vm.addRedirectRoute(toState, toParams);

      if (event) {
        event.preventDefault();
      }

      $state.go('login');
    }
    
    vm.beOptimistic = false;

    return this;
  }

  function openStayLoggedInModal($injector, $state, $modal, Session) {
    //Only open if on a protected page? and the modal is not already shown. 
    if ($state.current.data.isProtected && !$('#stayLoggedInModal').is(':visible')) {
      var AuthService = $injector.get('AuthService');
      var modal = $modal.open({
          templateUrl: 'stayLoggedInModal/stayLoggedInModal.html',
          controller: 'StayLoggedInController as StayLoggedIn',
          backdrop: 'static',
          keyboard: false,
          show: false,
        });

      modal.result.then(function(result) {
        //login success
      },

      function(result) {
        //TODO:Once we stop using rootScope we can remove this and the depenedency on Injector
        AuthService.logout();
        $state.go('content', {link: '/'});
      });
    }
  }
})();
