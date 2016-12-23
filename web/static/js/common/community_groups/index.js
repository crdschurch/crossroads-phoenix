(function() {
  'use strict';

  var MODULES = require('crds-constants').MODULES;

  angular.module(MODULES.COMMON)
    .factory('Group', require('./group.service'))
    ;

})();
