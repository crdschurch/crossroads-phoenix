(function() {
  'use strict';

  require('./signupProgress.html');
  angular.module('crossroads.trips')
    .directive('signupProgress', require('./signupProgress.directive'))
    .controller('SignupProgressController', require('./signupProgress.controller'));

})();
