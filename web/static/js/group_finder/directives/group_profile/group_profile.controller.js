(function() {
  'use strict';

  module.exports = GroupProfileCtrl;

  GroupProfileCtrl.$inject = ['$scope', 'ImageService', 'GoogleDistanceMatrixService', 'Responses', '$state'];

  function GroupProfileCtrl($scope, ImageService, GoogleDistanceMatrixService, Responses, $state) {

    $scope.defaultGroup = {
      groupTitle: 'Chuck M.',
      type: 'Men only',
      time: 'Fridays @ 7 pm',
      imageUrl: 'https://crds-cms-uploads.imgix.net/content/images/chuck-mingo.jpg',
      attributes: ['kids welcome', 'has cats'],
      host: { contactId: 12345 },
      editProfilePicture: false,
      description: 'Hi, I\'m Chuck. I’m 37 years old, married and a dad to three adventurous kids. ' +
        'I like to run marathons, watch the Philadelphia Eagles (when they’re good) and I really like to smile. ' +
        'This is my fourth time hosting a group and I’m looking forward to connecting with some new people and getting BRAVE. ' +
        'We\'ll meet at my house in Pleasant Ridge.'
    };

    var responses = Responses.data;

    $scope.displayDefaultGroup = !angular.isDefined($scope.group);
    $scope.group = $scope.displayDefaultGroup ? $scope.defaultGroup : $scope.group;
    $scope.host = $scope.group.host;

    $scope.getProfileImage = function() {
      if ($scope.displayDefaultGroup) {
        return $scope.defaultGroup.imageUrl;
      } else {
        return ImageService.ProfileImageBaseURL + $scope.group.contactId;
      }
    };

    $scope.getDefaultImage = function() {
      return ImageService.DefaultProfileImage;
    };

    if ($scope.group.distance) {
      $scope.getGroupDistance = function(result) {
        return $scope.group.distance + ' miles away from you';
      };
    } else if (!$scope.displayDefaultGroup && $scope.group.address && responses.location) {
      // TODO: This probably will no longer be used, but leaving here due to timeline
      var hostAddress = $scope.group.address.addressLine1 + ', ' +
        $scope.group.address.city + ', ' +
        $scope.group.address.state + ', ' +
        $scope.group.address.zip;
      var participantAddress = responses.location.street + ', ' +
        responses.location.city + ', ' +
        responses.location.state + ', ' +
        responses.location.zip;

      GoogleDistanceMatrixService.distanceFromAddress(hostAddress, [
        participantAddress
      ]).then(function(result) {
        $scope.getGroupDistance = function() {
          if (result[0].distance) {
            var distance = Math.round((result[0].distance.value / 1609.344) * 10) / 10;
            return distance + ' miles away from you';
          }
        };
      }, defaultDistance);
    } else {
      defaultDistance();
    }

    $scope.getGroupType = function() {
      return $scope.group.type;
    };

    function defaultDistance() {
      $scope.getGroupDistance = function() {
        return '0 miles away from you';
      };
    }

  }

})();

