'use strict';
(function() {
  module.exports = ProfilePersonalDirective;

  ProfilePersonalDirective.$inject = ['$log', '$rootScope', 'ProfileReferenceData', 'Validation'];

  function ProfilePersonalDirective($log, $rootScope, ProfileReferenceData, Validation) {

    return {
      restrict: 'E',
      bindToController: true,
      scope: {
        allowPasswordChange: '=',
        attributeTypes: '=?',
        buttonCss: '@',
        buttonText: '=',
        contactId: '=?',
        forTrips: '=',
        modalInstance: '=?',
        requireMobilePhone: '=',
        submitFormCallback: '&?',
        profileData: '=?',
        updatedPerson: '=?',
        enforceAgeRestriction: '=?',
        locations: '=',
        profileParentForm: '=?'
      },
      templateUrl: 'personal/profilePersonal.template.html',
      controller: 'ProfilePersonalController as profile',
    };
  }
})();
