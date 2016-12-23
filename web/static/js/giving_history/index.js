(function() {
  'use strict';

  require('./history.html');
  require('./templates/donation_list.html');
  require('./templates/giving_years.html');
  require('./templates/household_information.html');
  var app = angular.module('crossroads');

  app.factory('GivingHistoryService', require('./giving_history.service'));
  app.controller('GivingHistoryController', require('./giving_history.controller'));
  app.directive('donationList', require('./donation_list.directive'));
  app.directive('givingYears', require('./giving_years.directive'));
  app.directive('householdInformation', require('./household_information.directive'));
})();