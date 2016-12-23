(function() {
  'use strict';

  var MODULE = require('crds-constants').MODULES.COMMON;

  angular.module(MODULE)
    .directive('childCareNeed', require('./childCareNeed.directive'))
    ;

  require('./childCareNeed.html');
})();
