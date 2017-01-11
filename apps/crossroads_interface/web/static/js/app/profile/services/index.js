(function() {
  'use strict';

  var MODULES = require('crds-constants').MODULES;

  angular.module(MODULES.PROFILE)
    .factory('Lookup', require('./lookup.service'))
    .factory('Profile', require('./profile.service'))
    .factory('ProfileReferenceData', require('./profileReference.service'))
    ;
})();
