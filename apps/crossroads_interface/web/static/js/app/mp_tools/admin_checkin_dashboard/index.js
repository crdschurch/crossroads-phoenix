(function() {
  'use strict()';

  var MODULE = 'crossroads.mptools';

  require('./templates/adminCheckinDashboard.html');
  require('./templates/eventRooms.html');

  var app = angular.module(MODULE);
  app.factory('AdminCheckinDashboardService', require('./adminCheckinDashboard.service'));
  app.factory('Focus', require('./focus.service'));
  app.directive('eventRooms', require('./eventRooms.directive'));
  app.controller('AdminCheckinDashboardController', require('./adminCheckinDashboard.controller'));

})();
