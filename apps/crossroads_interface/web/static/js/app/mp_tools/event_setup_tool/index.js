(function() {
  'use strict()';

  var MODULE = 'crossroads.mptools';

  require('./eventSetup.html');

  var app = angular.module(MODULE);
  app.controller('EventSetupController', require('./eventSetup.controller'));
})();
