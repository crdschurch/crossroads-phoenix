(function() {
  'use strict()';

  var constants = require('crds-constants');

  require('./profileCommunications.html');

  var app = angular.module(constants.MODULES.PROFILE);
  app.controller('ProfileCommunicationsController', require('./profileCommunications.controller'));
})();

