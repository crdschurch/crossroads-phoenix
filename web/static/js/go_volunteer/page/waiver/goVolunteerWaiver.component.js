(function() {
  'use strict';

  module.exports = GoVolunteerWaiver;

  GoVolunteerWaiver.$inject = ['$rootScope', 'GoVolunteerService', 'GoVolunteerDataService', '$log'];

  function GoVolunteerWaiver($rootScope, GoVolunteerService, GoVolunteerDataService, $log) {
    return {
      restrict: 'E',
      scope: {
        onSubmit: '&'
      },
      bindToController: true,
      controller: GoVolunteerWaiverController,
      controllerAs: 'goWaiver',
      templateUrl: 'waiver/goVolunteerWaiver.template.html'
    };

    function GoVolunteerWaiverController() {
      var vm = this;
      vm.processing = false;
      vm.submit = submit;
      vm.waiver = null;

      activate();

      function activate() {
        if (GoVolunteerService.cmsInfo && GoVolunteerService.cmsInfo.pages.length > 0) {
          vm.waiver = GoVolunteerService.cmsInfo.pages[0].content;
        } else {
          vm.waiver = $rootScope.MESSAGES.goVolunteerWaiverTerms.content;
        }
      }

      function submit() {
        if (vm.processing) {
          return false;
        }

        vm.processing = true;
        GoVolunteerService.saveSuccessful = false;
        try {
          var dto = GoVolunteerService.getRegistrationDto();
          GoVolunteerDataService.Create.save(dto, function(result) {
            console.log('success');
            vm.processing = false;
            GoVolunteerService.saveSuccessful = true;
            vm.onSubmit({nextState: 'thank-you'});
          },

          function(err) {
            $log.error(err);
            vm.processing = false;
            vm.onSubmit({nextState: 'thank-you'});
          });
        } catch (err) {
          console.log(err);
          vm.onSubmit({nextState: 'thank-you'});
        }
      }
    }
  }

})();
