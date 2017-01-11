(function() {
  'use strict';

  var MODULE = require('crds-constants').MODULES.CHILDCARE;

  angular.module(MODULE)
    .directive('childcareEvent', require('./childcareEvent.directive'))
    ;

  require('./childcareEvent.html');
})();
