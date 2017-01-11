'use strict';

var MODULE = 'crossroads.trips';

var app =  angular.module(MODULE);
require('./tripsearch.html');

app.controller('TripSearchCtrl', require('./tripsearch.controller'));

require('../trip_participant_card');
