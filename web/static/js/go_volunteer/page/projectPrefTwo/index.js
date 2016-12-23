(function() {
  'use strict';

  var MODULE = require('crds-constants').MODULES.GO_VOLUNTEER;

  require('./goVolunteerProjectPrefTwo.template.html');

  angular.module(MODULE)
    .directive('goVolunteerProjectPrefTwo', require('./goVolunteerProjectPrefTwo.component'));
})();
