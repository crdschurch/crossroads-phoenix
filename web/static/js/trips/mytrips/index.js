'use strict';

var MODULE = 'crossroads.trips';

var app =  angular.module(MODULE);
require('./mytrips.html');
require('./mytripCard.html');
app.directive('myTripCard', require('./mytripCard.directive'));
app.controller('MyTripsController', require('./mytrips.controller'));

require('../trip_donate_card');
