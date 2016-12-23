(function() {
  'use strict';

  require('./tripgiving.html');
  require('./tripgivingTemplates/account.html');
  require('./tripgivingTemplates/amount.html');
  require('./tripgivingTemplates/change.html');
  require('./tripgivingTemplates/confirm.html');
  require('./tripgivingTemplates/login.html');
  require('./tripgivingTemplates/register.html');
  require('./tripgivingTemplates/thank_you.html');

  angular.module('crossroads.trips')
    .controller('TripGivingController', require('./tripgiving.controller'))
    .factory('TripGiving', require('./tripGiving.service'));

})();
