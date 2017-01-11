(function() {
  'use strict';

  var MODULE = require('crds-constants').MODULES.COMMON;

  angular.module(MODULE)
    .factory('ChildCare', require('./childcare.service'))
    ;

  require('./childCareNeed');
})();
