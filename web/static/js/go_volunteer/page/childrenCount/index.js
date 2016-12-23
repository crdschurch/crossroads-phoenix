(function() {
  'use strict';

  var MODULE = require('crds-constants').MODULES.GO_VOLUNTEER;

  require('./goVolunteerChildrenCount.template.html');

  angular.module(MODULE)
    .directive('goVolunteerChildrenCount', require('./goVolunteerChildrenCount.component'));
})();
