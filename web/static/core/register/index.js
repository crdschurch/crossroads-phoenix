(function() {
  'use strict';

  angular.module('crossroads.core')
    .controller('RegisterController', require('./register.controller'))
    .directive('registerForm', require('./register.directive'))
    ;


  require('./register_form.html');
  require('./register_page.html');

})();
