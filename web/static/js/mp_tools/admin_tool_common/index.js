(function() {
  'use strict()';

  var MODULE = 'crossroads.mptools';

  require('./adminTool.html');
  require('./templates/eventFilter.html');
  require('./templates/siteFilter.html');

  var app = angular.module(MODULE);
  app.directive('eventFilter', require('./eventFilter.directive'));
  app.directive('siteFilter', require('./siteFilter.directive'));
  app.controller('AdminToolController', require('./adminTool.controller'));

})();
