(function() {
  'use strict';

  module.exports = GoVolunteerSignin;

  GoVolunteerSignin.$inject = [];

  function GoVolunteerSignin() {
    return {
      restrict: 'E',
      scope: {},
      bindToController: true,
      controller: GoVolunteerSigninController,
      controllerAs: 'goVolunteerSignin',
      templateUrl: 'signin/goVolunteerSignin.template.html'
    };

    function GoVolunteerSigninController() {
      var vm = this;
    }
  }
})();
