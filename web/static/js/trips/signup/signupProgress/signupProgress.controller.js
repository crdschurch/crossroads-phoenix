(function() {
  'use strict';

  module.exports = SignupProgressController;

  SignupProgressController.$inject = [];

  /*
   * variables provided by the directive...
   * currentStep
   * totalSteps
   * progressLabel
   */
  function SignupProgressController() {

    var vm = this;
    vm.percentComplete = percentComplete;
    vm.progressMessage = progressMessage;

    activate();

    ////////////////////////////////
    //// IMPLEMENTATION DETAILS ////
    ////////////////////////////////
    function activate() { }

    function percentComplete() {
      if (vm.currentStep === 'thanks') {
        return 100;
      }

      var percent = Math.round(((vm.currentStep) / (vm.totalSteps+1)) * 100);
      return percent;
    }

    function progressMessage() {
      var message = vm.progressLabel;
      if (vm.currentStep <= vm.totalSteps) {
        message += ' | Step ' + vm.currentStep + ' of ' + vm.totalSteps;
      }

      return message;
    }

  }

})();
