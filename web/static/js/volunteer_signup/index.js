'use strict()';

var app = angular.module("crossroads");
require("./volunteer_signup_form.html");

app.controller("VolunteerController", require("./volunteer.controller"));
app.factory("Opportunity", ["$resource", "Session", require('./opportunity_service')]);
