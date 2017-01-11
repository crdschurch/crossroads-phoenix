(function() {
  'use strict';

  module.exports = ProfilePictureController;

  ProfilePictureController.$inject = ['$rootScope', '$scope', 'ImageService', '$modal'];

  /**
   * Controller for the ProfilePictureDirective
   * Variables passed into the directive and available to
   * this controller include:
   *    ...
   *    ...
   */
  function ProfilePictureController($rootScope, $scope, ImageService, $modal) {
    var vm = this;
    vm.path = ImageService.ProfileImageBaseURL + vm.contactId;
    vm.defaultImage = ImageService.DefaultProfileImage;
    vm.disallowChange = vm.disallowChange || false;
    vm.openModal = openModal;
    // Manage directive style and text defaults
    vm.wrapperClass = vm.wrapperClass || 'col-xs-3 col-sm-2';
    vm.imageClass = vm.imageClass || '';
    vm.buttonText = vm.buttonText || 'Change Photo';
    vm.useDefault = vm.useDefault || false;

    activate();

    function activate() {
      if (vm.useDefault) {
        // debugger;
        vm.path = vm.defaultImage;
      }
    }

    function openModal() {
      var changeProfileImage = $modal.open({
        templateUrl: 'picture/profileImageUpload.html',
        controller: 'ChangeProfileImageController as modal',
        backdrop: true,
        show: false
      });

      changeProfileImage.result.then(function(croppedImage) {
        vm.path = croppedImage;
        ImageService.ProfileImage.save(croppedImage);
        $rootScope.$emit('profilePhotoChanged');
      });

    }
  }

})();
