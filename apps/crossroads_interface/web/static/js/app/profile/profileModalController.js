(function() {

  module.exports = ProfileModalController;

  ProfileModalController.$inject = ['$modalInstance', 'person', 'Lookup'];

  function ProfileModalController($modalInstance, person, Lookup) {
    var vm = this;

    vm.cancel = cancel;
    vm.locations = locations();
    vm.modalInstance = $modalInstance;
    vm.ok = ok;
    vm.person = person;

    //////////////////////////

    function ok() {
      $modalInstance.close(vm.person);
    }

    function cancel() {
      $modalInstance.dismiss('cancel');
    }

    function locations() {
      return Lookup.query({
        table: 'crossroadslocations'
      }, function(data) {
        return data;
      });
    }

  }

})();
