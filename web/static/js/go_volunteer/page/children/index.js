(function() {
  'use strict';

  var MODULE = require('crds-constants').MODULES.GO_VOLUNTEER;

  require('./goVolunteerChildren.template.html');

  angular.module(MODULE)
    .directive('goVolunteerChildren', require('./goVolunteerChildren.component'));
})();
