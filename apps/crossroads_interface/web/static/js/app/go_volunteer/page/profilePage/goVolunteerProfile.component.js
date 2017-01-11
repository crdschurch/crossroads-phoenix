(function() {
  'use strict';

  var moment = require('moment');

  module.exports = VolunteerProfile;

  VolunteerProfile.$Inject = ['GoVolunteerService', 'Validation', '$rootScope', '$state'];

  function VolunteerProfile(GoVolunteerService, Validation, $rootScope, $state) {
    return {
      restrict: 'E',
      scope: {
        onSubmit: '&'
      },
      bindToController: true,
      controller: VolunteerProfileController,
      controllerAs: 'volunteerProfile',
      templateUrl: 'profilePage/goVolunteerProfile.template.html'
    };

    function VolunteerProfileController() {

      var now = new Date();

      var vm = this;
      vm.birthdateOpen = false;
      vm.initDate = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      vm.maxBirthdate = new Date(now.getFullYear() - 18, now.getMonth(), now.getDate());
      vm.oneHundredFiftyYearsAgo = new Date(now.getFullYear() - 150, now.getMonth(), now.getDate());
      vm.openBirthdatePicker = openBirthdatePicker;
      vm.person = GoVolunteerService.person;
      vm.phoneFormat = /^\(?(\d{3})\)?[\s.-]?(\d{3})[\s.-]?(\d{4})$/;
      vm.requireUnique = requireUnique;
      vm.submit = submit;
      vm.validate = validate;

      activate();

      //////////////////////////

      function activate() {
        // any logic that needs to be done on initialization
      }

      function openBirthdatePicker($event) {
        $event.preventDefault();
        $event.stopPropagation();

        vm.birthdateOpen = true;
      }

      function requireUnique() {
        return ($state.current.name === 'go-volunteer.crossroadspage');
      }

      function submit() {
        vm.profileForm.$setSubmitted();
        if (vm.profileForm.$valid) {
          vm.onSubmit({nextState: 'spouse'});
        } else {
          $rootScope.$emit('notify', $rootScope.MESSAGES.generalError);
        }
      }

      function validate(fieldName) {
        return Validation.showErrors(vm.profileForm, fieldName);
      }

    }
  }

})();
