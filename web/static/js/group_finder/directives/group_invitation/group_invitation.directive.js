(function() {
  'use strict';

  module.exports = GroupInvitationDirective;

  require('./group_invitation.html');

  GroupInvitationDirective.$inject = [];

  function GroupInvitationDirective() {
    return {
      restrict: 'AE',
      scope: {
        groupId: '=',
        headline: '@'
      },
      controller: require('./group_invitation.controller'),
      controllerAs: 'ctrl',
      templateUrl: 'group_invitation/group_invitation.html'
    };
  }
})();
