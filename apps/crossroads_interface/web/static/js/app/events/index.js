//(function() {
	'use strict';

	require('./atriumevents.html');

	var app = angular.module('crossroads');

	app.directive('addEventsData', require('./atriumEvents.directive'));
//})();