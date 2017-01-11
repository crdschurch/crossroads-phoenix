(function() {
  'use strict';

  module.exports = SignupProgressDirective;

  SignupProgressDirective.$inject = [];

  function SignupProgressDirective() {
    return {
      restrict: 'E',
      scope: {
        currentStep: '=',
        totalSteps: '=',
        progressLabel: '='
      },
      templateUrl: 'signupProgress/signupProgress.html',
      controller: 'SignupProgressController as progress',
      bindToController: true,
    };
  }

})();
