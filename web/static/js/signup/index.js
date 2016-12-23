(function() {
  'use strict';

  require('./onetime_event');
  
  var MODULES = require('crds-constants').MODULES;

  angular.module(MODULES.SIGNUP, [
    MODULES.COMMON,
    MODULES.ONETIME_SIGNUP,
    MODULES.CORE
  ]).config(require('./signup.routes'))
    .directive('crdsSignup', require('./crdsSignup.directive'))
    .factory('SignupService', require('./signup.service'))
    ;

  require('./signup.html');

  require('./community_group_signup');
})();
