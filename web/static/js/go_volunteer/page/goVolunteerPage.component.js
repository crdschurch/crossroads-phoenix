(function() {
  'use strict';

  module.exports = GoVolunteerPage;

  GoVolunteerPage.$inject = ['$state', '$stateParams', '$window', 'GoVolunteerService'];

  function GoVolunteerPage($state, $stateParams, $window, GoVolunteerService) {
    return {
      restrict: 'E',
      scope: {},
      bindToController: true,
      controller: GoVolunteerPageController,
      controllerAs: 'goVolunteerPage',
      templateUrl: 'page/goVolunteerPage.template.html'
    };

    function GoVolunteerPageController() {
      var vm = this;

      vm.handlePageChange = handlePageChange;
      vm.reload = 'goVol.reload';
      vm.showProfile = showProfile;
      vm.showSignin = showSignin;
      vm.showSpouse = showSpouse;
      vm.showOrgName = showOrgName;
      vm.showSpouseName = showSpouseName;
      vm.showChildren = showChildren;
      vm.showChildrenCount = showChildrenCount;
      vm.showCms = showCms;
      vm.showGroupConnector = showGroupConnector;
      vm.showGroupFindConnector = showGroupFindConnector;
      vm.showConnectorInfo = showConnectorInfo;
      vm.showLaunchSite = showLaunchSite;
      vm.showProjectPrefOne = showProjectPrefOne;
      vm.showProjectPrefTwo = showProjectPrefTwo;
      vm.showProjectPrefThree = showProjectPrefThree;
      vm.showUniqueSkills = showUniqueSkills;
      vm.showEquipment = showEquipment;
      vm.showAdditionalInfo = showAdditionalInfo;
      vm.showAvailablePrep = showAvailablePrep;
      vm.showAvailablePrepSpouse = showAvailablePrepSpouse;
      vm.showWaiver = showWaiver;
      vm.showThankYou = showThankYou;

      $window.onbeforeunload = onBeforeUnload;

      activate();

      function activate() {
        // if page is loaded with goVol.reload = true, then send to begining of flow
        // should only occur if user refreshes
        var fromReload = angular.fromJson($window.sessionStorage.getItem(vm.reload)) || false;
        if (fromReload) {
          $window.sessionStorage.setItem(vm.reload, angular.toJson(false));
          $state.go('go-volunteer.city.organizations', {city: $window.sessionStorage.getItem('go-volunteer.city')});
        }
      }

      function handlePageChange(nextState) {
        if (!$stateParams.organization) {
          $state.go('go-volunteer.crossroadspage', {
            page: nextState
          });

        } else {
          $state.go('go-volunteer.page', {
            city: $stateParams.city,
            organization: $stateParams.organization,
            page: nextState
          });
        }
      }

      function onBeforeUnload() {
        if (!GoVolunteerService.saveSuccessful) {
          setTimeout(function() {
            setTimeout(function() {
              $window.sessionStorage.setItem(vm.reload, angular.toJson(false));
            }, 100);
          }, 1);

          $window.sessionStorage.setItem(vm.reload, angular.toJson(true));
          return '';
        }
      }

      function showProfile() {
        return $stateParams.page === 'profile';
      }

      function showSignin() {
        return $stateParams.page === 'signin';
      }

      function showSpouse() {
        return $stateParams.page === 'spouse';
      }

      function showOrgName() {
        return $stateParams.page === 'name';
      }

      function showSpouseName() {
        return $stateParams.page === 'spouse-name';
      }

      function showChildren() {
        return $stateParams.page === 'children';
      }

      function showCms() {
        return $state.current.name === 'go-volunteer.cms';
      }

      function showChildrenCount() {
        return $stateParams.page === 'children-count';
      }

      function showGroupConnector() {
        return $stateParams.page === 'group-connector';
      }

      function showGroupFindConnector() {
        return $stateParams.page === 'group-find-connector';
      }

      function showConnectorInfo() {
        return $stateParams.page === 'be-a-connector';
      }

      function showLaunchSite() {
        return $stateParams.page === 'launch-site';
      }

      function showProjectPrefOne() {
        return $stateParams.page === 'project-preference-one';
      }

      function showProjectPrefTwo() {
        return $stateParams.page === 'project-preference-two';
      }

      function showProjectPrefThree() {
        return $stateParams.page === 'project-preference-three';
      }

      function showUniqueSkills() {
        return $stateParams.page === 'unique-skills';
      }

      function showEquipment() {
        return $stateParams.page === 'equipment';
      }

      function showAdditionalInfo() {
        return $stateParams.page === 'additional-info';
      }

      function showAvailablePrep() {
        return $stateParams.page === 'available-prep' || $stateParams.page === 'available-prep-spouse';
      }

      function showAvailablePrepSpouse() {
        return $stateParams.page === 'available-prep-spouse';
      }

      function showWaiver() {
        return $stateParams.page === 'waiver';
      }

      function showThankYou() {
        return $stateParams.page === 'thank-you';
      }

    }
  }

})();
