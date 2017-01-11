(function() {
  'use strict';

  var MODULE = require('crds-constants').MODULES.CHILDCARE;

  angular.module(MODULE)
    .directive('childcareChild', require('./childcareChild.directive'))
    ;

  require('./childcareChild.html');

})();
