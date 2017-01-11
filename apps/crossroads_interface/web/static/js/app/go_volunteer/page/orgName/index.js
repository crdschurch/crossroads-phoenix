(function() {
  'use strict';

  var MODULE = require('crds-constants').MODULES.GO_VOLUNTEER;

  require('./goVolunteerOrgName.template.html');

  angular.module(MODULE)
    .directive('goVolunteerOrgName', require('./goVolunteerOrgName.component'));
})();
