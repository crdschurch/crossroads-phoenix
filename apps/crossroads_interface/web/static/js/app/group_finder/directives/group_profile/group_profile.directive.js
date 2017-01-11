(function() {
  'use strict';

  module.exports = GroupProfileDirective;



  GroupProfileDirective.$inject = [];

  function GroupProfileDirective() {
    return {
      restrict: 'AE',
      scope: {
        group: '=?'
      },
      controller: 'GroupProfileCtrl',
      templateUrl: 'group_profile/group_profile.html'
    };
  }
})();
