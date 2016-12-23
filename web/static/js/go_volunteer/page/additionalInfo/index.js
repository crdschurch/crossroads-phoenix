(function() {
  'use strict';

  var MODULE = require('crds-constants').MODULES.GO_VOLUNTEER;

  require('./goVolunteerAdditionalInfo.template.html');

  angular.module(MODULE)
    .directive('goVolunteerAdditionalInfo', require('./goVolunteerAdditionalInfo.component'));
})();
