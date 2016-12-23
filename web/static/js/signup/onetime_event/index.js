(function() {
  'use strict';

  var MODULES = require('crds-constants').MODULES;

  angular.module(MODULES.ONETIME_SIGNUP, [MODULES.CORE, MODULES.COMMON])
    .directive('onetimeEvent', require('./onetimeEvent.component'))
    ;

  require('./onetimeEvent.html');

  require('./onetime_event_block');

})();
