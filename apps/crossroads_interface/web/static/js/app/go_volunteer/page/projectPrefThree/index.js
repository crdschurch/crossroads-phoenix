(function() {
  'use strict';

  var MODULE = require('crds-constants').MODULES.GO_VOLUNTEER;

  require('./goVolunteerProjectPrefThree.template.html');

  angular.module(MODULE)
    .directive('goVolunteerProjectPrefThree', require('./goVolunteerProjectPrefThree.component'));
})();
