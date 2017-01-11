(function(){
  'use strict()';

  var app = angular.module('crossroads');
  require('./volunteerApplicationForm.html');

  app.controller('VolunteerApplicationController', require('./volunteerApplication.controller'));
  app.factory('Opportunity', ['$resource', 'Session', require('../services/opportunity_service')]);
  app.factory('VolunteerService', require('./volunteer.service'));

})();
