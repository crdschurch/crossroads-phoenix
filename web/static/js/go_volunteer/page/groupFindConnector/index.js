(function() {
  'use strict';

  var MODULE = require('crds-constants').MODULES.GO_VOLUNTEER;

  require('./goVolunteerGroupFindConnector.template.html');

  angular.module(MODULE)
    .directive('goVolunteerGroupFindConnector', require('./goVolunteerGroupFindConnector.component'));
})();
