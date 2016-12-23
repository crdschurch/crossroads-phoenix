var app = angular.module("crossroads");
require('./signup-select-person.html');
require('./signup-page-1.html');
require('./signup-page-2.html');
require('./signup-page-3.html');
require('./signup-page-4.html');
require('./signup-page-5.html');
require('./signup-page-confirmation.html');

app.controller("GoTripsCtrl", require("./gotrips_controller"));
