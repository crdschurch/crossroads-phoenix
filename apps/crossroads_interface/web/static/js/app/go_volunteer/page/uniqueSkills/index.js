(function() {
  'use strict';

  var MODULE = require('crds-constants').MODULES.GO_VOLUNTEER;

  require('./goVolunteerUniqueSkills.template.html');

  angular.module(MODULE)
    .directive('goVolunteerUniqueSkills', require('./goVolunteerUniqueSkills.component'));
})();
