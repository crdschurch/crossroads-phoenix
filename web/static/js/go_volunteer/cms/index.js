(function() {
  'use strict';
  
  var MODULE = require('crds-constants').MODULES.GO_VOLUNTEER;

  angular.module(MODULE).
    directive('goVolunteerCms', require('./goVolunteerCms.component'));

})();
