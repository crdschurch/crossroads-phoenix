(function(){
  'use strict';

  require('./loadingButton.html');

  angular.module('crossroads.core').directive('loadingButton', require('./loadingButton.directive'));


})();
