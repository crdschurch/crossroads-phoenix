(function() {
  'use strict()';

  var MODULE = 'crossroads.mptools';

  require('./checkScannerBatches.service');
  require('./checkBatchProcessor.html');
  require('./required.validator');

  angular.module(MODULE).controller('CheckBatchProcessor', require('./checkBatchProcessor.controller'));

})();
