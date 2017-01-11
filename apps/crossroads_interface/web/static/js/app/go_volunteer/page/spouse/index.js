(function() {
  'use strict';

  var MODULE = require('crds-constants').MODULES.GO_VOLUNTEER;

  require('./goVolunteerSpouse.template.html');

  angular.module(MODULE)
    .directive('goVolunteerSpouse', require('./goVolunteerSpouse.component'));
})();
