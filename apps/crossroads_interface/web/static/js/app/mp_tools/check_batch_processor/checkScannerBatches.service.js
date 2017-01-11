'use strict()';
(function() {
  angular.module('crossroads.mptools').factory('CheckScannerBatches', CheckScannerBatches);

  CheckScannerBatches.$inject = ['$resource'];

  function CheckScannerBatches($resource) {
    return({
      batches: $resource(__API_ENDPOINT__ + 'api/checkscanner/batches'),
      checks: $resource(__API_ENDPOINT__ + 'api/checkscanner/batches/:batchName/checks')
    });
  }

})();
