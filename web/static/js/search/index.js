'use strict';

var app = angular.module('crossroads');

require('./search-results.html');

app.controller("SearchCtrl", ['$log', '$state', require("./search.controller")]);
