(function() {
  'use strict';
  angular.module('crossroads.core').factory('InterceptorFactory', InterceptorFactory);

  InterceptorFactory.$inject = ['$injector'];

  function InterceptorFactory($injector) {
    return {
      request: function(config) {
        return config;
      },

      response: function(response) {
        if (response.headers('refreshToken')) {
          var Session = $injector.get('Session');
          Session.refresh(response);
        }

        return response;
      }
    };
  }

  var app = angular.module('crossroads.core');
  app.config(AppConfig);
  AppConfig.$inject = ['$httpProvider'];
  function AppConfig($httpProvider) {
    $httpProvider.interceptors.push('InterceptorFactory');
  }

})();
