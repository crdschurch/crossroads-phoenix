import controller from './socialSharing.controller';

SocialSharingComponent.$inject = [];

export default function SocialSharingComponent() {

  let socialSharingComponent = {
    restrict: 'E',
    templateUrl: 'social_sharing/socialSharing.html',
    controller: controller,
    controllerAs: 'socialSharing',
    bindToController: true
  }

  return socialSharingComponent;
}