(function() {
  'use strict';

  var MODULE = require('crds-constants').MODULES.GO_VOLUNTEER;

  require('./goVolunteerWaiver.template.html');

  angular.module(MODULE)
    .directive('goVolunteerWaiver', require('./goVolunteerWaiver.component'));
})();
