import TripDepositComponent from './tripDeposit/tripDeposit.component';
import TripDeposit from './tripDeposit/tripDeposit.service';

(function() {
  'use strict';
  require('./signupPage.html');
  angular.module('crossroads.trips')
    .controller('TripsSignupController', require('./tripsSignup.controller'))
    .controller('SignupStepController', require('./signupStep.controller'))
    .factory('TripsSignupService', require('./tripsSignup.service'))
    .component('tripDeposit', TripDepositComponent)
    .service('TripDeposit', TripDeposit);

  require('./signupProgress');
  require('./familySelectTool');

  require('./page0');
  require('./pageTemplates');

})();
