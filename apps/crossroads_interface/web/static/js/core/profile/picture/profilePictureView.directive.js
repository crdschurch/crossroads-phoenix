'use strict';
(function() {
  module.exports = ProfilePictureView;

  ProfilePictureView.$inject = [];

  function ProfilePictureView() {
    return {
      restrict: 'E',
      replace: true,
      bindToController: true,
      scope: {
        contactId: '=?',
      },
      templateUrl: 'picture/profilePictureView.template.html',
      controller: 'ProfilePictureViewController as pictureView',
    };
  }
})();
