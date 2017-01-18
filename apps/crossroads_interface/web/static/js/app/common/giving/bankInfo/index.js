(function() {
  require('./bankInfo.html');

  var constants = require('crds-constants');

  angular.module(constants.MODULES.COMMON)
    .directive('bankInfo', require('./bankInfo.directive'));

})();
