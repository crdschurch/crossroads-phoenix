(function() {
  'use strict';

  var MODULE = require('crds-constants').MODULES;

  angular.module(MODULE.CHILDCARE, [MODULE.CORE, MODULE.COMMON])
    .config(require('./childcare.routes'))
    .directive('childcare', require('./childcare.directive'))
    .factory('ChildcareEvents', require('./childcareEvents.service'))
    .factory('ChildcareService', require('./childcare.service'))
    ;

  require('./childcare.html');

  require('./childcareEvent');

  require('./childcareChild');

})();
