var app = angular.module("crossroads");
require('./thedaily.html');
app.controller('TheDailyController', require('./thedaily.controller.js'));
app.factory('EmailSubscriptionService', require('./services/emailSubscriptionService.js'));