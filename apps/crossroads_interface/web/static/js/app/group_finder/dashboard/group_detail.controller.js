(function() {
  'use strict';

  module.exports = GroupDetailCtrl;

  GroupDetailCtrl.$inject = ['$scope', '$stateParams', '$modal', 'AuthenticatedPerson', 'GroupInfo', 'GROUP_ROLE'];

  function GroupDetailCtrl($scope, $stateParams, $modal, AuthenticatedPerson, GroupInfo, GROUP_ROLE) {
    var vm = this;

    vm.participant_role_id = GROUP_ROLE.PARTICIPANT;
    vm.loading = true;
    vm.emailGroup = emailGroup;
    vm.displayBackButton = true;

    vm.resultsPromise = GroupInfo.loadGroupInfo()
      .then(function displayGroups() {
        vm.group = GroupInfo.findHosting($stateParams.groupId);
        $scope.$parent.setGroup(vm.group);
        vm.loading = false;
      });

    function emailGroup() {
      var modalInstance = $modal.open({
        templateUrl: 'templates/group_contact_modal.html',
        controller: 'GroupContactCtrl as contactModal',
        resolve: {
          fromContactId: function() {
            return vm.group.contactId;
          },
          toContactIds: function() {
            return _.map(vm.group.members, function(member) {return member.contactId;});
          }
        }
      });

      modalInstance.result.then(function (selectedItem) {
        $scope.selected = selectedItem;
      });
    }

  }

})();
