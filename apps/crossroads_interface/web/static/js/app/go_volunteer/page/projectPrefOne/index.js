(function() {
  'use strict';

  var MODULE = require('crds-constants').MODULES.GO_VOLUNTEER;

  require('./goVolunteerProjectPrefOne.template.html');

  angular.module(MODULE)
    .directive('goVolunteerProjectPrefOne', require('./goVolunteerProjectPrefOne.component'));
})();
