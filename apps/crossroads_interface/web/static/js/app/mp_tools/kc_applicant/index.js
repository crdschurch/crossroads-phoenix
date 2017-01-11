(function(){
  'use strict()';

  var MODULE = 'crossroads.mptools';
  
  // HTML Files
  require('./applicant.html');

  angular.module(MODULE).controller('KCApplicantController', require('./kcApplicant.controller'));

})();
