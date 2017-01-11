(function() {
  'use strict';

  angular.module('crossroads.core')
    .controller('ProfilePictureViewController', require('./profilePictureView.controller'))
    .directive('profilePictureView', require('./profilePictureView.directive'))
    ;

  require('./profilePictureView.template.html');
})();
