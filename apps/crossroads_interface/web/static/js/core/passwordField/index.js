(function() {
  'use strict';

  angular.module('crossroads.core')
    .directive('passwordField', require('./passwordField.directive.js'));

  require('./passwordField.html');

})();
