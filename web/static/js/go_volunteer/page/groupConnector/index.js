(function() {
  'use strict';

  var MODULE = require('crds-constants').MODULES.GO_VOLUNTEER;

  require('./goVolunteerGroupConnector.template.html');

  angular.module(MODULE)
    .directive('goVolunteerGroupConnector', require('./goVolunteerGroupConnector.component'));
})();
