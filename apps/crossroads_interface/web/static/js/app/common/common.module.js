(function() {
  'use strict';

  var constants = require('constants');

  angular.module(constants.MODULES.COMMON, []);

  // require all giving common components
  require('./giving');

  // require all profile common components
  require('./profile');

  // require all community group components
  require('./community_groups');

  // require all childcare components
  require('./childcare');

  // require events
  require('./events');

  require('./serve');

  require('./services');

  require('./filters');

})();
