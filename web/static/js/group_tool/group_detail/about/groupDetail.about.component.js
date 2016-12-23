import controller from './groupDetail.about.controller';

GroupDetailAboutComponent.$inject = [ ];

export default function GroupDetailAboutComponent() {

  const groupDetailAboutComponent = {
    bindings: {
      data: '<',
      edit: '<',
      forInvitation: '<',
      forSearch: '<',
      isLeader: '<',
      showShareButtons: '<'
    },
    restrict: 'E',
    templateUrl: 'about/groupDetail.about.html',
    controller,
    controllerAs: 'groupDetailAbout',
    bindToController: true
  };

  return groupDetailAboutComponent;
}