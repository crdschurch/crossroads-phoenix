(function() {
  'use strict()';

  module.exports = AdminToolController;

  AdminToolController.$inject = ['MPTools', 'role', 'goToFunction'];

  function AdminToolController(MPTools, role, goToFunction) {
    var vm = this;
    vm.service = MPTools;
    vm.allowAccess = undefined;

    activate();

    //////////////////////

    function activate() {
      vm.allowAccess = vm.service.allowAccess(role);
      if (!vm.allowAccess) {
        return;
      }

      MPTools.getSelectedId(goToFunction);
    }
  }
})();
