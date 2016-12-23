(function() {

  'use strict';

  module.exports = OneTimeRoutes;

  OneTimeRoutes.$inject = ['$stateProvider'];

  /**
   * This holds all of One-Time Giving routes
   */
  function OneTimeRoutes($stateProvider) {
    $stateProvider
      .state('give.one_time_confirm', {
        templateUrl: 'templates/one_time_confirm.html'
      })
      .state('give.one_time_account', {
        templateUrl: 'templates/one_time_account.html'
      })
      .state('give.one_time_change', {
        templateUrl: 'templates/one_time_change.html'
      })
      .state('give.one_time_thank-you', {
        templateUrl: 'templates/one_time_thank_you.html'
      })
      .state('give.one_time_login', {
        templateUrl: 'templates/one_time_login.html'
      });
  }

})();
