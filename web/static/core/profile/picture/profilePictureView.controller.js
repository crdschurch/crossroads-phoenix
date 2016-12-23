(function() {
  'use strict';

  module.exports = ProfilePictureViewController;

  ProfilePictureViewController.$inject = ['$rootScope', '$scope', '$timeout', 'ImageService', '$cookies'];

  function ProfilePictureViewController($rootScope, $scope, $timeout, ImageService, $cookies) {
    var vm = this;
    if (!vm.contactId) {
      vm.contactId = $cookies.get('userId');
    }

    vm.path = ImageService.ProfileImageBaseURL + vm.contactId;
    vm.defaultImage = ImageService.DefaultProfileImage;

    $rootScope.$on('profilePhotoChanged', function(event, data) {
      $timeout(function() {
        vm.path = ImageService.ProfileImageBaseURL + vm.contactId + '?' + new Date().getTime();
      }, 500);
    });
  }

})();
