(function() {
  'use strict';

  var MODULE = require('crds-constants').MODULES.GO_VOLUNTEER;

  require('./goVolunteerSignin.template.html');

  angular.module(MODULE)
    .directive('goVolunteerSignin', require('./goVolunteerSignin.component'))
    ;
})();
