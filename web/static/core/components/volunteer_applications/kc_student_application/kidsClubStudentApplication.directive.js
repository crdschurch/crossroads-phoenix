"use strict()";

(function() {

  module.exports = KidsClubStudentApplication;

  KidsClubStudentApplication.$inject = ['$log', '$rootScope'];

  function KidsClubStudentApplication($log, $rootScope) {

    return {
      restrict: 'EA',
      templateUrl: 'kc_student_application/kidsClubStudentApplication.template.html',
      controller: 'KidsClubStudentApplicationController as kcStudentApplication',
      scope: {
          volunteer: '=volunteer',
          contactId: '=contactId',
          pageInfo: '=pageInfo',
          responseId: '=responseId',
          showSuccess: '=showSuccess'
      },
      bindToController: true
    };
  }

})();
