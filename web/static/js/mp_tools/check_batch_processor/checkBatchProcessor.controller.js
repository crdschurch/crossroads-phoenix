(function() {
  'use strict()';

  module.exports = CheckBatchProcessor;

  CheckBatchProcessor.$inject = ['$rootScope', '$log', 'MPTools', 'CheckScannerBatches', 'Programs', 'AuthService', 'GIVE_PROGRAM_TYPES', 'CRDS_TOOLS_CONSTANTS'];

  function CheckBatchProcessor($rootScope, $log, MPTools, CheckScannerBatches, getPrograms, AuthService, GIVE_PROGRAM_TYPES, CRDS_TOOLS_CONSTANTS) {
    var vm = this;

    vm.allBatches = [];
    vm.batch = {};
    vm.batches = [];
    vm.checkCounts = {};
    vm.openBatches = [];
    vm.programs = [];
    vm.program = {};
    vm.processing = false;
    vm.params = MPTools.getParams();
    vm.showClosedBatches = false;

    activate();

    //////////////////////

    function activate() {
      CheckScannerBatches.batches.query({onlyOpen: false}, function(data) {
        vm.allBatches = data;
      });

      CheckScannerBatches.batches.query(function(data) {
        vm.openBatches = data;
        vm.batches = vm.openBatches;
      });

      getPrograms.Programs.get({'excludeTypes[]': [GIVE_PROGRAM_TYPES.NonFinancial]}, function(data) {
        vm.programs = _.sortBy(data, 'Name');
      });
    }

    vm.allowAccess = function() {
      return (AuthService.isAuthenticated() && AuthService.isAuthorized(CRDS_TOOLS_CONSTANTS.SECURITY_ROLES.FinanceTools));
    }

    vm.filterBatches = function() {
      vm.batches = vm.showClosedBatches ? vm.allBatches : vm.openBatches;
    }

    vm.processBatch = function(target) {
      if (target.checkBatchProcessorForm.$invalid) {
        $rootScope.$emit('notify', $rootScope.MESSAGES.generalError);
        return;
      }
      vm.processing = true;

      CheckScannerBatches.checks.query({batchName: vm.batch.name}).$promise.then(function(data) {
        var counts = _.countBy(data, 'exported');
        vm.checkCounts = {
          total: data.length,
          notExported: counts.false ? counts.false : 0,
          exported: counts.true ? counts.true : 0
        };

        CheckScannerBatches.batches.save({name: vm.batch.name, programId: vm.program.ProgramId}).$promise.then(function(){
          vm.success = true;
          vm.error = false;
        }, function() {
          vm.success = false;
          vm.error = true;
        }).finally(function() {
          vm.processing = false;
        });
      }, function() {
        vm.success = false;
        vm.error = true;
      });
    };
  }
})();
