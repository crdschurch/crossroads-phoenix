(function() {
  'use strict';

  var MODULE = require('crds-constants').MODULES.GO_VOLUNTEER;

  require('./goVolunteerSpouseName.template.html');

  angular.module(MODULE)
    .directive('goVolunteerSpouseName', require('./goVolunteerSpouseName.component'));
})();
