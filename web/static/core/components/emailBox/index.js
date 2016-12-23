(function() {
  'use strict';

  require('./emailBox.html');
  angular.module('crossroads.core')
    .directive('emailBox', require('./emailBox.directive'))
    .controller('EmailBoxController', require('./emailBox.controller'))
    ;
})();
