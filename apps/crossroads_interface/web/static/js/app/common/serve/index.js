(function() {
  'use strict'; 

  var MODULE = require('crds-constants').MODULES.COMMON;

  angular.module(MODULE).factory('ServeOpportunities', require('./serveOpportunities.service'));
})();
