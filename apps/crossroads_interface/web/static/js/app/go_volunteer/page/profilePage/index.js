(function() {
  'use strict';

  var MODULE = require('crds-constants').MODULES.GO_VOLUNTEER;

  require('./goVolunteerProfile.template.html');

  angular.module(MODULE)
    .directive('goVolunteerProfile', require('./goVolunteerProfile.component'));

})();
