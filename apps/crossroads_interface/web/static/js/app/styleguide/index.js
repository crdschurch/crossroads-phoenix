var app = angular.module("crossroads");
require('./styleguide.html');
//require('../preloader/preloader.html');
app.controller("StyleguideCtrl", require("./styleguide_controller"));
