(function() {
  'use strict()';

  module.exports = GPExportController;

  GPExportController.$inject = ['$rootScope', '$log', 'MPTools', 'GPExport', 'AuthService', 'CRDS_TOOLS_CONSTANTS'];

  function GPExportController($rootScope, $log, MPTools, GPExport, AuthService, CRDS_TOOLS_CONSTANTS) {
    var vm = this;

    vm.selectedDeposits = [];
    vm.error = false;
    vm.params = MPTools.getParams();

    activate();
    //////////////////////

    function activate() {
      GPExport.FileNames.query({selectionId: vm.params.selectedRecord}, function(data) {
        vm.selectedDeposits = data;
      });
    };

    vm.allowAccess = function() {
      return(AuthService.isAuthenticated() && AuthService.isAuthorized(CRDS_TOOLS_CONSTANTS.SECURITY_ROLES.FinanceTools));
    };

    vm.generateGPExportFile = function(deposit) {
      deposit.processing = true;

      GPExport.File.download({selectionId: vm.params.selectedRecord, depositId: deposit.id}).$promise.then(function(data) {
        //trick to download store a file having its URL
        //Found on http://stackoverflow.com/questions/14215049/how-to-download-file-using-angularjs-and-calling-mvc-api
        var fileURL = URL.createObjectURL(data.response.blob);
        var a = document.createElement('a');
        a.href = fileURL;
        a.target = '_blank';
        a.download = deposit.export_file_name;
        document.body.appendChild(a);
        a.click();

        vm.error = false;
        vm.selectedDeposits.splice(vm.selectedDeposits.indexOf(deposit), 1);
      }, function(data) {
        vm.error = true;
      }).finally(function(){
        deposit.processing = false;
      });
    };
  }
})();
