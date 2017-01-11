(function(){
  'use strict';

  module.exports = GroupInvitationCtrl;

  GroupInvitationCtrl.$inject = ['$scope', '$log', '$cookies', 'Group', 'EMAIL_TEMPLATES'];

  function GroupInvitationCtrl($scope, $log, $cookies, Group, EMAIL_TEMPLATES) {
    var vm = this;
    vm.inviteMember = inviteMember;
    vm.inviteSuccess = false;
    vm.inviteError = false;
    vm.sending = false;

    //
    // Controller implementation
    //

    function inviteMember() {
      vm.sending = true;
      vm.inviteSuccess = false;
      vm.inviteError = false;

      var contactId =  $cookies.get('userId');
      var toSend = {
        groupId: $scope.groupId,
        fromContactId: contactId,
        templateId: EMAIL_TEMPLATES.INVITE_EMAIL_ID,
        emailAddress: vm.invitee
      };

      Group.EmailInvite.save(toSend).$promise.then(function inviteEmailSuccess() {
        vm.inviteSuccess = true;
        vm.invitee = null;
        vm.sending = false;
      }, function inviteEmailError(error) {
        vm.inviteError = true;
        vm.sending = false;
      });
    }
  }

})();
