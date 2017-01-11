(function() {
  'use strict';

  var MODULE = require('crds-constants').MODULES.GO_VOLUNTEER;

  require('./goVolunteerConnectorInfo.template.html');

  angular.module(MODULE)
    .directive('goVolunteerConnectorInfo', require('./goVolunteerConnectorInfo.component'));
})();
