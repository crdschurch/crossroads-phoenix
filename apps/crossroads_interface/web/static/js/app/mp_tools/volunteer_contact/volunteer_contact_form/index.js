(function() {
  'use strict';

  var MODULE = require('crds-constants').MODULES.MPTOOLS;

  angular.module(MODULE)
    .directive('volunteerContactForm', require('./volunteerContactForm.component'));

  require('./volunteerContactForm.html');

})();
