(function() {
  'use strict';

  var MODULE = require('crds-constants').MODULES.GO_VOLUNTEER;

  require('./goVolunteerCity.template.html');

  angular.module(MODULE)
    .directive('goVolunteerCity', require('./goVolunteerCity.component'))
    ;
})();
