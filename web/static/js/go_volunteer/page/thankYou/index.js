(function() {
  'use strict';

  var MODULE = require('crds-constants').MODULES.GO_VOLUNTEER;

  require('./goVolunteerThankYou.template.html');

  angular.module(MODULE)
    .directive('goVolunteerThankYou', require('./goVolunteerThankYou.component'));
})();
