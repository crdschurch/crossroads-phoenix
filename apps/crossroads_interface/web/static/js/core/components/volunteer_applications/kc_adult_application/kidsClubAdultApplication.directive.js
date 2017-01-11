'use strict()';

(function(){

  module.exports = KidsClubAdultApplication;

  KidsClubAdultApplication.$inject = ['$log', '$rootScope'];

  function KidsClubAdultApplication($log, $rootScope){

    return {
      restrict: 'EA',
      templateUrl : 'kc_adult_application/kidsClubAdultApplication.template.html',
      controller: 'KidsClubAdultApplicationController as kcAdultApplication',
      scope: {
        volunteer: '=volunteer',
        contactId: '=contactId',
        pageInfo: '=pageInfo',
        opportunityId: '=opportunityId',
        responseId: '=responseId',
        showSuccess: '=showSuccess'
      },
      bindToController: true
    };
  }

})();
