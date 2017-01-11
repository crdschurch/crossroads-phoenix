(function(){
  'use strict()';

  var MODULE = require('crds-constants').MODULES.MPTOOLS;
  angular.module(MODULE)
    .controller('SignupToServeController', require('./signupToServe.controller'));
  
  require('./su2s.html');
  require('./su2sData.service');
})();
