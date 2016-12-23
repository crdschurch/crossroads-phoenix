(function() {
  'use strict';

  module.exports = ProfilePictureDirective;

  ProfilePictureDirective.$inject = [];

  function ProfilePictureDirective() {
    return {
      restrict: 'E',
      replace: true,
      scope: {
        contactId: '=?',
        wrapperClass: '@?',
        imageClass: '@?',
        buttonText: '@?',
        disallowChange: '@?',
        useDefault: '@?'
      },
      controller: 'ProfilePictureController as picture',
      bindToController: true,
      templateUrl: 'picture/profilePicture.html'
    };
  }

})();
