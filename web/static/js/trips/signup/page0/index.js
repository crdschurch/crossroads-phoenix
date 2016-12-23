(function() {
  'use strict';

  var constants = require('crds-constants');

  require('./page0.html');
  angular.module(constants.MODULES.TRIPS).controller('Page0Controller', require('./page0.controller'));

})();
