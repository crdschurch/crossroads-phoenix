(function() {
  'use strict';

  var MODULE = require('crds-constants').MODULES.ONETIME_SIGNUP;

  angular.module(MODULE).directive('onetimeEventBlock', require('./onetimeEventBlock.component'));

  require('./onetimeEventBlock.html');
})();
