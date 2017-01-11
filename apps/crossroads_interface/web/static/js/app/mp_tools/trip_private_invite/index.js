(function() {
  'use strict()';

  var MODULE = 'crossroads.mptools';

  // HTML Files
  require('./invite.html');

  angular.module(MODULE).controller('TripPrivateInviteController', require('./tripPrivateInvite.controller'));

})();
