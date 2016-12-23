(function(){
  'use strict';

  module.exports = DashboardCtrl;

  DashboardCtrl.$inject = [
    '$rootScope',
    '$scope',
    'ImageService',
    'GroupInfo',
    'AuthenticatedPerson'
  ];

  function DashboardCtrl(
    $rootScope,
    $scope,
    ImageService,
    GroupInfo,
    AuthenticatedPerson
  ) {

    var vm = this;

    vm.person = AuthenticatedPerson;
    vm.name = AuthenticatedPerson.nickName;
    vm.profileImageBaseUrl = ImageService.ProfileImageBaseURL;
    vm.profileImage = vm.profileImageBaseUrl + vm.person.contactId;
    vm.defaultImage = ImageService.DefaultProfileImage;
    vm.loading = true;

    vm.resultsPromise = GroupInfo.loadGroupInfo()
      .then(function displayGroups() {
        vm.groups = {
          hosting: GroupInfo.getHosting(),
          participating: GroupInfo.getParticipating()
        };
        vm.loading = false;
      });

    $scope.setGroup = function(group) {
      vm.group = group;
    };

    $rootScope.$on('$viewContentLoading', function(event){
      vm.group = undefined;
    });
  }

})();
