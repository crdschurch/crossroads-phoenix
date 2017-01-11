(function() {
  'use strict';

  var MODULES = require('crds-constants').MODULES;

  angular.module(MODULES.SIGNUP)
    .directive('communityGroups', require('./communityGroups.directive'))
    .controller('CommunityGroupSignupController', require('./communityGroupSignup.controller'))
    ;

  require('./communityGroupSignupForm.html');
})();
