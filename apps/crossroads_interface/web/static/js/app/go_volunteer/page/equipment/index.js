(function() {
  'use strict';

  var MODULE = require('crds-constants').MODULES.GO_VOLUNTEER;

  require('./goVolunteerEquipment.template.html');

  angular.module(MODULE)
    .directive('goVolunteerEquipment', require('./goVolunteerEquipment.component'));
})();
