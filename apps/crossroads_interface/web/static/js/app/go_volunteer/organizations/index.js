(function() {
  'use strict';

  var MODULE = require('crds-constants').MODULES.GO_VOLUNTEER;

  require('./organizations.template.html');

  angular.module(MODULE)
    .directive('goVolunteerOrganizations', require('./organizations.component'))
    ;
})();
