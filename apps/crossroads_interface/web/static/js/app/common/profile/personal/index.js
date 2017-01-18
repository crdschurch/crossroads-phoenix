import EmailChangeService from './emailChange.service.js';

(function() {
  'use strict';
  var constants = require('crds-constants');

  angular.module(constants.MODULES.COMMON).
    controller('ProfilePersonalController', require('./profilePersonal.controller'))
  .controller('ConfirmPasswordCtrl', require('./confirmPassword.controller'))
  .directive('uniqueEmail', ['$http', 'Session', 'User', require('./profileUniqueEmail.directive')])
  .directive('validateDate', ['$log', require('./profileValidDate.directive')])
  .directive('profilePersonal', require('./profilePersonal.directive'))
  .service('emailChange', EmailChangeService)
  ;

  require('./profilePersonal.template.html');
  require('./confirmPassword.html');

})();
