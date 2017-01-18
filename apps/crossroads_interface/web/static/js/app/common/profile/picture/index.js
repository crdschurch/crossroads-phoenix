(function() {
  'use strict';

  var constants = require('crds-constants');

  angular.module(constants.MODULES.COMMON)
    .directive('profilePicture', require('./profilePicture.directive'))
    .controller('ProfilePictureController', require('./profilePicture.controller'))
    .controller('ChangeProfileImageController', require('./changeProfileImage.controller'))
    ;

  require('./profilePicture.html');
  require('./profileImageUpload.html');
})();
