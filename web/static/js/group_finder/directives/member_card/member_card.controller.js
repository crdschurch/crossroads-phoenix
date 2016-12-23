(function(){
  'use strict';

  module.exports = MemberCardCtrl;

  MemberCardCtrl.$inject = ['$scope', 'ImageService', 'GROUP_TYPES'];

  function MemberCardCtrl($scope, ImageService, GROUP_TYPES) {

    $scope.defaultImage = ImageService.DefaultProfileImage;
    $scope.memberImage = ImageService.ProfileImageBaseURL + $scope.member.contactId;
    $scope.memberName = $scope.member.firstName + ' ' + $scope.member.lastName[0] + '.';

  }

})();
