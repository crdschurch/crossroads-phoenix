/**
 * A controller for retrieving current events for a Crossroads site.
 */
(function() {
	'use strict';
	module.exports =  function ($scope, $log, $http, $location, Events){
		$log.debug("EventsController loaded");
		// Initialize data object, will get populated with response
		$scope.data = {};
		$scope.data.events = Events.getDailyEvents($location.search().site);
	};
})();