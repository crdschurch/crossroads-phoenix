(function() {
  'use strict';

  var MODULE = require('crds-constants').MODULES.GO_VOLUNTEER;

  require('./goVolunteerAvailablePrep.template.html');

  angular.module(MODULE)
    .directive('goVolunteerAvailablePrep', require('./goVolunteerAvailablePrep.component'));
})();
