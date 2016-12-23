(function() {
  'use strict';

  require('./stayLoggedInModal.html');
  angular.module('crossroads.core')
    .controller('StayLoggedInController', require('./stayLoggedInModal.controller'))
    ;
})();