(function() {
  'use strict';

  var MODULE = require('crds-constants').MODULES.GO_VOLUNTEER;

  require('./goVolunteerLaunchSite.template.html');

  angular.module(MODULE)
    .directive('goVolunteerLaunchSite', require('./goVolunteerLaunchSite.component'));
})();
